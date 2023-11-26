package com.hactheclimatetest1.hacktheclimatetest1.service;

import org.springframework.stereotype.Service;

@Service
public class FuelConsumptionImpl implements FuelConsumption {

    @Override
    public double CalculateFuelConsumption(int carSize, double distance)
    {
        final double fuelPrice = 6.60;
        double consumption;
        if (carSize == 1)
            consumption = 0.06630;
        else if (carSize == 2)
            consumption = 0.07100;
        else
            consumption = 0.10000;

        return consumption * distance * fuelPrice;
    }
}
