import type { Map, Marker, LatLng, LatLngExpression, MarkerOptions } from "leaflet";

// Leaflet type aliases for compatibility
type IMarker = Marker;
type IMarkerOptions = MarkerOptions;
type IMap = Map;
type ILatLng = LatLng;
type ILatLngExpression = LatLngExpression;

export type { IMarker, ILatLng, ILatLngExpression, IMarkerOptions, IMap };
