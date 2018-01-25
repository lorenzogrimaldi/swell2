package com.sv.swell.repository;

import com.sv.swell.domain.Entrenador;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Entrenador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntrenadorRepository extends JpaRepository<Entrenador, Long> {

}
