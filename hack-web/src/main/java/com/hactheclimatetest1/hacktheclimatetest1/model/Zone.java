package com.hactheclimatetest1.hacktheclimatetest1.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Zone {

    @Id
    private Long id;
    private String name;
    @JsonManagedReference
    @OneToMany(mappedBy = "zone", cascade = CascadeType.ALL)
    private List<ParkingMeter> parkingMeters;
    private double firstHourPrice;
    private double secondHourPrice;
    private double thirdHourPrice;
    private double fourthHourPrice;

    public Zone(Long id, String name, List<ParkingMeter> parkingMeters, double firstHourPrice, double secondHourPrice, double thirdHourPrice, double fourthHourPrice) {
        this.id = id;
        this.name = name;
        this.parkingMeters = parkingMeters;
        this.firstHourPrice = firstHourPrice;
        this.secondHourPrice = secondHourPrice;
        this.thirdHourPrice = thirdHourPrice;
        this.fourthHourPrice = fourthHourPrice;
    }

    public Zone() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ParkingMeter> getParkingMeters() {
        return parkingMeters;
    }

    public void setParkingMeters(List<ParkingMeter> parkingMeters) {
        this.parkingMeters = parkingMeters;
    }

    public double getFirstHourPrice() {
        return firstHourPrice;
    }

    public void setFirstHourPrice(double firstHourPrice) {
        this.firstHourPrice = firstHourPrice;
    }

    public double getSecondHourPrice() {
        return secondHourPrice;
    }

    public void setSecondHourPrice(double secondHourPrice) {
        this.secondHourPrice = secondHourPrice;
    }

    public double getThirdHourPrice() {
        return thirdHourPrice;
    }

    public void setThirdHourPrice(double thirdHourPrice) {
        this.thirdHourPrice = thirdHourPrice;
    }

    public double getFourthHourPrice() {
        return fourthHourPrice;
    }

    public void setFourthHourPrice(double fourthHourPrice) {
        this.fourthHourPrice = fourthHourPrice;
    }
}
