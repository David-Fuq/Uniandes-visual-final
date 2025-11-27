export interface Accident {
  fecha: string;
  ubicacion: string;
  id_camera: string;
  ACCIDENTE: string;
  Gravedad_nombre: string;
  con_embriaguez: string;
  con_persona_mayor: string;
  con_embarazo: string;
  latitud: string;
  longitud: string;
  año: string;
}

export interface ProcessedAccident extends Accident {
  fechaDate: Date;
  severityNormalized: string;
  yearMonth: Date;
}

export interface SegmentProperties {
  camera_id: string;
  segment_id: number;
  distance_m: number;
  install_date: string;
  accidents_monthly: string[];
  accidents_yearly_avg: string[];
  speed_pre_kph: number | null;
  speed_post_kph: number | null;
  principal?: string;
}

export interface SegmentGeometry {
  type: "MultiLineString" | "LineString" | "Point" | "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][] | number[];
}

export interface Segment {
  type: "Feature";
  properties: SegmentProperties;
  geometry: SegmentGeometry;
}

export interface SegmentosGeoJSON {
  type: "FeatureCollection";
  features: Segment[];
}

export interface CameraInfo {
  installDate: Date;
  principal: string | null;
}

export interface CameraStats {
  avgBefore: number;
  avgAfter: number;
  countBefore: number;
  countAfter: number;
  monthsBefore: number;
  monthsAfter: number;
  color: string;
  status: string;
}

export interface LineDataPoint {
  date: Date;
  count: number;
  cameraId: string;
}

export interface LineData {
  cameraId: string;
  points: LineDataPoint[];
  installDate: Date | null;
  principal: string | null;
  totalAccidents: number;
}

export type SeverityFilter = "TODOS" | "CON MUERTOS" | "CON HERIDOS" | "SOLO DAÑOS";
export type PrincipalFilter = string;