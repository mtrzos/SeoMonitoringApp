package com.ananas.smarteo.service;

import com.ananas.smarteo.domain.Report;

import java.util.List;

/**
 * Service Interface for managing Report.
 */
public interface ReportService {

    /**
     * Save a report.
     *
     * @param report the entity to save
     * @return the persisted entity
     */
    Report save(Report report);

    /**
     *  Get all the reports.
     *
     *  @return the list of entities
     */
    List<Report> findAll();

    /**
     *  Get the location reports.
     *
     *  @return the list of entities
     */
    List<Report> findByLocation(String location);

    /**
     *  Get the user's reports.
     *
     *  @return the list of entities
     */
    List<Report> findByUserIsCurrentUser();

    /**
     *  Get the user's locations.
     *
     *  @return the list of entities
     */
    List<String> findDistinctLocation();

    /**
     *  Get the "id" report.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Report findOne(Long id);

    /**
     *  Delete the "id" report.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
