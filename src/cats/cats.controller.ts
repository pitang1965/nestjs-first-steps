import { Controller, Get } from '@nestjs/common';

type Cat = {
  name: string;
  breed: string;
  
  age: number;
  weight: number;
  color: string;
  favorite_toy: string;
};

type CatArray = Cat[];

const myCats: CatArray = [
  {
    name: 'ミケ',
    breed: 'アメリカンショートヘア',
    age: 5,
    weight: 4.2,
    color: 'グレー',
    favorite_toy: '羽のおもちゃ',
  },
  {
    name: 'ソラ',
    breed: 'スコティッシュフォールド',
    age: 2,
    weight: 3.7,
    color: 'ホワイト',
    favorite_toy: 'ボール',
  },
  {
    name: 'ルナ',
    breed: 'メインクーン',
    age: 7,
    weight: 5.5,
    color: 'ブラウンタビー',
    favorite_toy: 'キャットタワー',
  },
];

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): CatArray {
    return myCats;
  }
}
