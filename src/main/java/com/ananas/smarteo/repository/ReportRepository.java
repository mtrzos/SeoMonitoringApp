package com.ananas.smarteo.repository;

import com.ananas.smarteo.domain.Report;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Report entity.
 */
@SuppressWarnings("unused")
public interface ReportRepository extends JpaRepository<Report,Long> {

    @Query("select report from Report report where report.user.login = ?#{principal.username}")
    List<Report> findByUserIsCurrentUser();

    List<Report> findByLocation(String location);

    @Query("select distinct location from Report report where report.user.login = ?#{principal.username}")
    List<String> findDistinctLocation();

    @Query("select distinct website from Report report where report.user.login = ?#{principal.username}")
    List<String> findDistinctCompetitor();
}
