package com.hactheclimatetest1.hacktheclimatetest1.service;

import com.hactheclimatetest1.hacktheclimatetest1.model.ParkingMeter;
import com.hactheclimatetest1.hacktheclimatetest1.repository.ParkingMeterRepository;
import com.hactheclimatetest1.hacktheclimatetest1.repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class OccupancyServiceImpl implements OccupancyService {

    final static double maxDistanceToClosestParkingMeter = 500;
    @Autowired
    ParkingMeterRepository parkingMeterRepository;
    @Autowired
    ZoneRepository zoneRepository;
    @Override
    public List<ParkingMeter> GetNearestParkingMeter(double xCordinate, double yCordinate)
    {
        ParkingMeter closestParkingMeter = null;
        List<ParkingMeter> parkingMeterList = parkingMeterRepository.findAll();
        //double minDistance = Double.MAX_VALUE;
        parkingMeterList.sort(Comparator.comparingDouble(p -> distance(p.getxCordinate(), xCordinate, p.getyCordinate(), yCordinate, 0.0, 0.0)));
        /*
        for (ParkingMeter parkingMeter : parkingMeterList
             ) {
            //double currentDistance = calculateDistance(parkingMeter.getxCordinate(), xCordinate, parkingMeter.getyCordinate(), yCordinate);
            double currentDistance = distance(parkingMeter.getxCordinate(), xCordinate, parkingMeter.getyCordinate(), yCordinate, 0.0, 0.0);
            if (minDistance>currentDistance)
            {
                minDistance=currentDistance;
                closestParkingMeter = parkingMeter;
            }

        }

        double minDistance = distance(parkingMeterList.get(0).getxCordinate(), xCordinate, parkingMeterList.get(0).getyCordinate(), yCordinate, 0.0, 0.0);
        if (minDistance > maxDistanceToClosestParkingMeter)
            return null;
        else */
            return parkingMeterList.subList(0,10);
    }

    public static double distance(double lat1, double lat2, double lon1,
                                  double lon2, double el1, double el2) {

        final int R = 6371; // Radius of the earth

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters

        double height = el1 - el2;

        distance = Math.pow(distance, 2) + Math.pow(height, 2);

        return Math.sqrt(distance);
    }
    /*
    private double calculateDistance(double latA, double yCordinate1, double latB, double yCordinate2)
    {
        final double RADIUS = 6371.01;
        double temp = Math.cos(Math.toRadians(latA))
                * Math.cos(Math.toRadians(latB))
                * Math.cos(Math.toRadians((latB) - (latA)))
                + Math.sin(Math.toRadians(latA))
                * Math.sin(Math.toRadians(latB));
        return temp * RADIUS * Math.PI / 180;
        //=6371*ACOS(COS(RADIANS(90-D7))*COS(RADIANS(90-D8))+SIN(RADIANS(90-D7))*SIN(RADIANS(90-D8))*COS(RADIANS(E7-E8)))/1,609
        //Math.sqrt(Math.pow(parkingMeter.getxCordinate()-xCordinate,2.0)+Math.pow(parkingMeter.getyCordinate()-yCordinate,2.0));
        //return Math.acos(Math.sin(yCordinate1*Math.PI/180.0)*Math.sin(yCordinate2*Math.PI/180.0)+Math.cos(yCordinate1*Math.PI/180.0)*Math.cos(yCordinate2*Math.PI/180.0)*Math.cos(xCordinate2*Math.PI/180.0-xCordinate1*Math.PI/180.0))*6371.0 / Math.PI * 180.0;
        //return Math.acos(Math.sin(yCordinate1*Math.PI/180.0)*Math.sin(yCordinate2*Math.PI/180.0)+Math.cos(yCordinate1*Math.PI/180.0)*Math.cos(yCordinate2*Math.PI/180.0)*Math.cos(xCordinate2*Math.PI/180.0-xCordinate1*Math.PI/180.0))*6371000.0;
    }
*/
}
