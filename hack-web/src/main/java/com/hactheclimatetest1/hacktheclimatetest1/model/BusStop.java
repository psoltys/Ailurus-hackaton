package com.hactheclimatetest1.hacktheclimatetest1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
public class BusStop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    @JsonBackReference
    @ManyToOne
    //@JsonIncludeProperties(value = {"id"})
    private Route route;
    @JsonProperty
    private String name;
    @JsonProperty
    private double xCordinate;
    @JsonProperty
    private double yCordinate;

    public BusStop(){}
    public BusStop(String name, double xCordinate, double yCordinate)
    {
        this.name = name;
        this.xCordinate = xCordinate;
        this.yCordinate = yCordinate;
    }
}
