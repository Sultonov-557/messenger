import { Reflector } from '@nestjs/core';
import { RolesGuard, RolesWSGuard } from './roles/roles.guard';

export const AuthorizationGuard = new RolesGuard(new Reflector());
export const AuthorizationWSGuard = new RolesWSGuard(new Reflector());
