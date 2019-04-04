import { Injectable } from '@angular/core';
import { Signal } from 'signals';
import { Observable } from 'rxjs';

@Injectable()
export class ContentUpdatedSignal extends Signal { }

@Injectable()
export class ContentLoadedSignal extends Signal { }

@Injectable()
export class TogglePreviewModeSignal extends Signal { }

@Injectable()
export class ToggleReviewModeSignal extends Signal { }
