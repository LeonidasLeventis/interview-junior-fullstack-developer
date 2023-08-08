import { Controller, Post, Body, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { DataService } from '../services/data.service';

@Controller('api')
export class ApiController {
  constructor(private readonly cityService: DataService) {}

  @Post('findCity')
  async submitForm(@Body() formData: any, @Res() res: Response): Promise<void> {
    try {
      // Find the city in the city.json file
      const cityName = formData.city;
      const cities = this.cityService.findCity(cityName, formData.page, formData.perPage);

      // Send a response back to the client
      if (cities) {
        res.status(200).json(cities);
      } else {
        res.status(404).json({ error: 'An error occurred' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while processing form data' });
    }
  }
}
