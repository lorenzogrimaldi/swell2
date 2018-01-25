package com.sv.swell.repository;

import com.sv.swell.domain.Escuela;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Escuela entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EscuelaRepository extends JpaRepository<Escuela, Long> {

}
