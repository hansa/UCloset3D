export enum ClothingType {
  SHIRT = 'SHIRT',
  PANTS = 'PANTS',
  JACKET = 'JACKET',
  JUMPER = 'JUMPER',
  SHOES = 'SHOES',
  HOODIE = 'HOODIE'
}

export enum Occasion {
  CASUAL = 'CASUAL',
  WORK = 'WORK',
  SPORT = 'SPORT',
  FORMAL = 'FORMAL'
}

export enum Color {
  RED = 'RED',
  BLUE = 'BLUE',
  BROWN = 'BROWN',
  PINK = 'PINK',
  GREY = 'GREY',
  BEIGE = 'BEIGE',
  GREEN = 'GREEN',
  BLACK = 'BLACK',
  WHITE = 'WHITE',
  YELLOW = 'YELLOW'
}

export interface ClothingItem {
  id?: number;
  type: ClothingType;
  name?: string | null;
  color?: Color | null;
  picture?: string | null;
  timesWorn?: number;
  lastWorn?: Date | null;
  isFavorite?: boolean;
  isAvailable?: boolean;
  description?: string | null;
}
