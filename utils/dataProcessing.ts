import * as d3 from "d3";
import {
  Accident,
  ProcessedAccident,
  SegmentosGeoJSON,
  CameraInfo,
  CameraStats,
  LineData,
  SeverityFilter,
  LineDataPoint,
} from "@/types";

export function normalizeSeverity(gravedad: string): string {
  const val = String(gravedad).toUpperCase(). trim();
  if (val === "CON MUERTOS" || val === "1") return "CON MUERTOS";
  if (val === "CON HERIDOS" || val === "2") return "CON HERIDOS";
  if (val === "SOLO DAÑOS" || val === "SOLO DANOS" || val === "3") return "SOLO DAÑOS";
  return val;
}

export function processAccidents(accidentes: Accident[]): ProcessedAccident[] {
  return accidentes.map((d) => ({
    ...d,
    fechaDate: new Date(d.fecha),
    severityNormalized: normalizeSeverity(d. Gravedad_nombre),
    yearMonth: new Date(
      new Date(d.fecha).getFullYear(),
      new Date(d.fecha).getMonth(),
      1
    ),
  }));
}

export function buildCameraInfo(segmentos: SegmentosGeoJSON): globalThis.Map<string, CameraInfo> {
  const cameraInfo = new globalThis.Map<string, CameraInfo>();

  segmentos.features.forEach((f) => {
    const cameraId = f.properties. camera_id;
    const currentInfo = cameraInfo.get(cameraId);

    if (! currentInfo) {
      cameraInfo.set(cameraId, {
        installDate: new Date(f.properties.install_date),
        principal: f.properties.principal || null,
      });
    } else {
      if (f.properties.principal && ! currentInfo.principal) {
        currentInfo.principal = f.properties.principal;
      }
    }
  });

  return cameraInfo;
}

export function getUniquePrincipals(segmentos: SegmentosGeoJSON): string[] {
  return [
    ...new Set(
      segmentos.features
        .map((f) => f.properties. principal)
        .filter((p): p is string => p != null && p !== "")
    ),
  ].sort();
}

export function generateAllMonths(): Date[] {
  const months: Date[] = [];
  for (let year = 2018; year <= 2022; year++) {
    for (let month = 0; month < 12; month++) {
      months.push(new Date(year, month, 1));
    }
  }
  return months;
}

export function calculateEffectiveness(
  cameraId: string,
  cameraInfo: globalThis.Map<string, CameraInfo>,
  accidentesByCamera: globalThis.Map<string, ProcessedAccident[]>,
  severityFilter: SeverityFilter
): CameraStats {
  const info = cameraInfo.get(cameraId);
  if (!info) {
    return {
      avgBefore: 0,
      avgAfter: 0,
      countBefore: 0,
      countAfter: 0,
      monthsBefore: 1,
      monthsAfter: 1,
      color: "#888888",
      status: "Sin cambio",
    };
  }

  const installDate = info.installDate;
  const installYear = installDate.getFullYear();
  const installMonth = installDate.getMonth() + 1;

  const cameraAccidents = accidentesByCamera.get(cameraId) || [];

  const filteredAccidents =
    severityFilter === "TODOS"
      ? cameraAccidents
      : cameraAccidents.filter((a) => a.severityNormalized === severityFilter);

  const beforeAccidents = filteredAccidents.filter((a) => {
    const accYear = a.fechaDate.getFullYear();
    const accMonth = a.fechaDate.getMonth() + 1;
    if (accYear < installYear) return true;
    if (accYear === installYear && accMonth <= installMonth) return true;
    return false;
  });

  const afterAccidents = filteredAccidents.filter((a) => {
    const accYear = a. fechaDate.getFullYear();
    const accMonth = a. fechaDate.getMonth() + 1;
    if (accYear > installYear) return true;
    if (accYear === installYear && accMonth > installMonth) return true;
    return false;
  });

  const dataStartDate = new Date(2018, 0, 1);
  const dataEndDate = new Date(2022, 11, 31);

  const effectiveInstallEnd = new Date(installYear, installMonth - 1, 28);
  let monthsBefore =
    (effectiveInstallEnd.getFullYear() - dataStartDate.getFullYear()) * 12 +
    (effectiveInstallEnd. getMonth() - dataStartDate. getMonth()) +
    1;
  monthsBefore = Math.max(1, monthsBefore);

  const afterStartDate = new Date(installYear, installMonth, 1);
  let monthsAfter =
    (dataEndDate.getFullYear() - afterStartDate.getFullYear()) * 12 +
    (dataEndDate.getMonth() - afterStartDate.getMonth()) +
    1;
  monthsAfter = Math.max(1, monthsAfter);

  const avgBefore = beforeAccidents.length / monthsBefore;
  const avgAfter = afterAccidents.length / monthsAfter;

  const epsilon = 0.0001;
  const diff = avgBefore - avgAfter;

  let color: string;
  let status: string;

  if (Math.abs(diff) < epsilon) {
    color = "#888888";
    status = "Sin cambio";
  } else if (diff > 0) {
    color = "#228B22";
    status = "Reducción";
  } else {
    color = "#DC143C";
    status = "Aumento";
  }

  return {
    avgBefore,
    avgAfter,
    countBefore: beforeAccidents.length,
    countAfter: afterAccidents.length,
    monthsBefore,
    monthsAfter,
    color,
    status,
  };
}

export function buildLineData(
  accidentesProcessed: ProcessedAccident[],
  cameraInfo: globalThis.Map<string, CameraInfo>,
  severityFilter: SeverityFilter,
  principalFilter: string,
  allMonths: Date[]
): LineData[] {
  // Get matching camera IDs based on principal filter
  const matchingCameraIds = new Set<string>();

  cameraInfo.forEach((info, cameraId) => {
    let matches = false;

    if (principalFilter === "Todas") {
      matches = true;
    } else if (principalFilter === "Otros") {
      matches = info.principal == null || info.principal === "";
    } else {
      matches = info.principal === principalFilter;
    }

    if (matches) {
      matchingCameraIds.add(cameraId);
    }
  });

  // Filter accidents
  const filteredAccidents = accidentesProcessed.filter((a) => {
    const severityMatch =
      severityFilter === "TODOS" || a.severityNormalized === severityFilter;
    const cameraMatch = matchingCameraIds.has(a.id_camera);
    return severityMatch && cameraMatch;
  });

  // Group by camera
  const accidentsByCamera = d3. group(filteredAccidents, (d) => d.id_camera);

  // Build line data
  const lineData: LineData[] = [];

  accidentsByCamera.forEach((accidents, cameraId) => {
    const info = cameraInfo.get(cameraId);

    const monthCounts = d3.rollup(
      accidents,
      (v) => v.length,
      (d) => d.yearMonth. getTime()
    );

    const points: LineDataPoint[] = allMonths.map((month) => ({
      date: month,
      count: monthCounts. get(month. getTime()) || 0,
      cameraId: cameraId,
    }));

    const totalAccidents = accidents.length;

    if (totalAccidents > 0) {
      lineData.push({
        cameraId: cameraId,
        points: points,
        installDate: info ?  info.installDate : null,
        principal: info ? info.principal : null,
        totalAccidents: totalAccidents,
      });
    }
  });

  return lineData;
}