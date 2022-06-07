export type Space = {
  id: number,
  name: string,
  capacity: number,
  minCapacity?: number,
  timeRestriction?: number,
  createdBy: string,
}

export type CreateSpaceRequestBody = {
  name: string,
  capacity: number,
  minCapacity?: number,
  timeRestriction?: number,
}

export type UpdateSpaceRequestBody = {
  name?: string,
  capacity?: number,
  minCapacity?: number,
  timeRestriction?: number,
}
