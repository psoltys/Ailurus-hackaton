package com.hactheclimatetest1.hacktheclimatetest1.controller;

import com.hactheclimatetest1.hacktheclimatetest1.model.ParkingMeter;
import com.hactheclimatetest1.hacktheclimatetest1.model.Zone;
import com.hactheclimatetest1.hacktheclimatetest1.repository.ParkingMeterRepository;
import com.hactheclimatetest1.hacktheclimatetest1.repository.ZoneRepository;
import com.hactheclimatetest1.hacktheclimatetest1.service.OccupancyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class OccupancyController {
    @Autowired
    private OccupancyService occupancyService;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private ParkingMeterRepository parkingMeterRepository;

    @GetMapping("/occupancy")
    public ParkingMeter GetOccupany(@RequestParam Double xCordinate, @RequestParam Double yCordinate)
    {
        return occupancyService.GetNearestParkingMeter(xCordinate, yCordinate);
    };

    @GetMapping("/zones")
    public List<Zone> GetZones()
    {
        return zoneRepository.findAll();
    }

    @GetMapping("/parkingMeters")
    public List<ParkingMeter> GetParkingMeters()
    {
        return parkingMeterRepository.findAll();
    }
}