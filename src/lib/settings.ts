import { context } from '../lib';

// #region Enums
export enum FillMode {
	NO_FILL,
	FILL,
}

export enum StrokeMode {
	NO_STROKE,
	STROKE,
}

export enum RectMode {
	CORNER,
	CENTER,
}

// #endregion

interface Settings {
	fillMode: FillMode;
	rectMode: RectMode;
	strokeMode: StrokeMode;
}

export const settings: Settings = {
	fillMode: FillMode.NO_FILL,
	rectMode: RectMode.CORNER,
	strokeMode: StrokeMode.STROKE,
};

//#region rect
export const rectMode = (mode: RectMode) => {
	settings.rectMode = mode;
};

rectMode.CENTER = RectMode.CENTER;
rectMode.CORNER = RectMode.CORNER;

//#endregion

//#region fill
export const fillMode = (mode: FillMode) => {
	settings.fillMode = mode;
};

fillMode.NO_FILL = FillMode.NO_FILL;
fillMode.FILL = FillMode.FILL;

export const fillStyle = (style: string) => {
	context.fillStyle = style;
};
//#endregion

//#region stroke
export const strokeMode = (mode: StrokeMode) => {
	settings.strokeMode = mode;
};

strokeMode.NO_STROKE = StrokeMode.NO_STROKE;
strokeMode.STROKE = StrokeMode.STROKE;

export const strokeStyle = (style: string) => {
	context.strokeStyle = style;
};

export const noStroke = () => {
	settings.strokeMode = StrokeMode.NO_STROKE;
};
//#endregion
