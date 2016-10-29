package com.ananas.smarteo.service.impl;

import com.ananas.smarteo.service.ReportService;
import com.ananas.smarteo.domain.Report;
import com.ananas.smarteo.repository.ReportRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Report.
 */
@Service
@Transactional
public class ReportServiceImpl implements ReportService{

    private final Logger log = LoggerFactory.getLogger(ReportServiceImpl.class);

    @Inject
    private ReportRepository reportRepository;

    /**
     * Save a report.
     *
     * @param report the entity to save
     * @return the persisted entity
     */
    public Report save(Report report) {
        log.debug("Request to save Report : {}", report);
        Report result = reportRepository.save(report);
        return result;
    }

    /**
     *  Get all the reports.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Report> findAll() {
        log.debug("Request to get all Reports");
        List<Report> result = reportRepository.findAll();

        return result;
    }

    /**
     *  Get the location reports.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Report> findByLocation(String location) {
        log.debug("Request to get location Reports");
        List<Report> result = reportRepository.findByLocation(location);

        return result;
    }

    /**
     *  Get the location reports.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Report> findByUserIsCurrentUser() {
        log.debug("Request to get location Reports");
        List<Report> result = reportRepository.findByUserIsCurrentUser();

        return result;
    }

    /**
     *  Get the location reports.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<String> findDistinctLocation() {
        log.debug("Request to get location Reports");
        List<String> result = reportRepository.findDistinctLocation();

        return result;
    }

    /**
     *  Get one report by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Report findOne(Long id) {
        log.debug("Request to get Report : {}", id);
        Report report = reportRepository.findOne(id);
        return report;
    }

    /**
     *  Delete the  report by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Report : {}", id);
        reportRepository.delete(id);
    }
}
