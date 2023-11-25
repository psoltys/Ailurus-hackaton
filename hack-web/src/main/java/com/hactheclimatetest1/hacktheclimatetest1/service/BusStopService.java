package com.hactheclimatetest1.hacktheclimatetest1.service;

import com.hactheclimatetest1.hacktheclimatetest1.repository.BusStopRepository;
import com.hactheclimatetest1.hacktheclimatetest1.model.BusStop;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface BusStopService {

    BusStop Save(BusStop busStop);
    List<BusStop> all ();
}
