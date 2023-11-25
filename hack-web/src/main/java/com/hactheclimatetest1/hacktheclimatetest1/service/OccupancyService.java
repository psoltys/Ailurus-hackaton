package com.hactheclimatetest1.hacktheclimatetest1.service;

import com.hactheclimatetest1.hacktheclimatetest1.model.ParkingMeter;

import java.util.List;

public interface OccupancyService {
    List<ParkingMeter> GetNearestParkingMeter(double xCordinate, double yCordinate);
}
