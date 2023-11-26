package com.hactheclimatetest1.hacktheclimatetest1.controller;

import com.hactheclimatetest1.hacktheclimatetest1.service.FuelConsumption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class FuelConsumptionController {
    @Autowired private FuelConsumption fuelConsumption;

    //@CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("/calculateFuelConsumption")
    public Double CalculateFuelConsumption(@RequestParam int carSize, @RequestParam Double distance)
    {
        return Math.round(100.0* fuelConsumption.CalculateFuelConsumption(carSize, distance))/100.0;
    }
}
