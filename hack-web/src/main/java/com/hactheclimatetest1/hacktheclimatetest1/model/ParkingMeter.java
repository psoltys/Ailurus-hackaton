package com.hactheclimatetest1.hacktheclimatetest1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;

@Entity
public class ParkingMeter {

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Zone getZone() {
        return zone;
    }

    public void setZone(Zone zone) {
        this.zone = zone;
    }

    @Id
    private Long id;
    private double xCordinate;
    private double yCordinate;
    private String street;
    private double occupation;

    public double getParkingTimeAddition() {
        return parkingTimeAddition;
    }

    public void setParkingTimeAddition(double parkingTimeAddition) {
        this.parkingTimeAddition = parkingTimeAddition;
    }

    private double parkingTimeAddition;

    //@JsonBackReference
    @JsonIncludeProperties(value = {"name","firstHourPrice","secondHourPrice","thirdHourPrice","fourthHourPrice"})
    @ManyToOne
    private Zone zone;

    public ParkingMeter(Long id, double xCordinate, double yCordinate, String street, double occupation, Zone zone) {
        this.xCordinate = xCordinate;
        this.yCordinate = yCordinate;
        this.street = street;
        this.occupation = occupation;
        this.id = id;
        this.zone = zone;

        if (occupation<=50.0)
            parkingTimeAddition=2.0*60.0;
        else if (50.0 < occupation && occupation <= 60.0)
            parkingTimeAddition=3.0*60.0;
        else if (60.0 < occupation && occupation <= 70.0)
            parkingTimeAddition=4.0*60.0;
        else if (70.0 < occupation && occupation <= 80.0)
            parkingTimeAddition=5.0*60.0;
        else if (80.0 < occupation && occupation <= 90.0)
            parkingTimeAddition=7.0*60.0;
        else if (90.0 < occupation && occupation <= 94.0)
            parkingTimeAddition=10.0*60.0;
        else
            parkingTimeAddition=15.0*60.0;
    }

    public ParkingMeter() {
    }

    public double getxCordinate() {
        return xCordinate;
    }

    public void setxCordinate(double xCordinate) {
        this.xCordinate = xCordinate;
    }

    public double getyCordinate() {
        return yCordinate;
    }

    public void setyCordinate(double yCordinate) {
        this.yCordinate = yCordinate;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public double getOccupation() {
        return occupation;
    }

    public void setOccupation(double occupation) {
        this.occupation = occupation;
    }
}
