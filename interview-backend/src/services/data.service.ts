import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DataService {
  private dataFilePath = path.join(__dirname,'../../../cities.json');
  private cities: any[];

  constructor() {
    this.loadDataFromFile();
  }

  private loadDataFromFile() {
    const rawData = fs.readFileSync(this.dataFilePath, 'utf-8');
    this.cities = JSON.parse(rawData);
  }

  findCity(cityName: string, page: number, perPage: number): any {
    const filteredCities = this.cities.filter(city => city.cityName.includes(cityName));
    const startIndex = (page - 1) * perPage;
    const paginatedCities = filteredCities.slice(startIndex, startIndex + perPage);
    const totalCount = filteredCities.length;
    return {
      totalCount: totalCount,
      data: paginatedCities,
    };
  }
}