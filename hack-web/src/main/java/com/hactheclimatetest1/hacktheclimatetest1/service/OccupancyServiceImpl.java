package com.hactheclimatetest1.hacktheclimatetest1.service;

import com.hactheclimatetest1.hacktheclimatetest1.model.ParkingMeter;
import com.hactheclimatetest1.hacktheclimatetest1.repository.ParkingMeterRepository;
import com.hactheclimatetest1.hacktheclimatetest1.repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OccupancyServiceImpl implements OccupancyService {
    @Autowired
    ParkingMeterRepository parkingMeterRepository;
    @Autowired
    ZoneRepository zoneRepository;
    @Override
    public ParkingMeter GetNearestParkingMeter(double xCordinate, double yCordinate)
    {
        ParkingMeter closestParkingMeter = null;
        List<ParkingMeter> parkingMeterList = parkingMeterRepository.findAll();
        double minDistance = Double.MAX_VALUE;
        for (ParkingMeter parkingMeter : parkingMeterList
             ) {
            double currentDistance = Math.sqrt(Math.pow(parkingMeter.getxCordinate()-xCordinate,2.0)+Math.pow(parkingMeter.getyCordinate()-yCordinate,2.0));
            if (minDistance>currentDistance)
            {
                minDistance=currentDistance;
                closestParkingMeter = parkingMeter;
            }

        }
        return closestParkingMeter;
    }

}
