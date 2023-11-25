package com.hactheclimatetest1.hacktheclimatetest1.service;

import com.hactheclimatetest1.hacktheclimatetest1.model.ParkingMeter;

public interface OccupancyService {
    ParkingMeter GetNearestParkingMeter(double xCordinate, double yCordinate);
}
