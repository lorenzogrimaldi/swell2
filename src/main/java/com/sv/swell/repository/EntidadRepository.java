package com.sv.swell.repository;

import com.sv.swell.domain.Entidad;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Entidad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntidadRepository extends JpaRepository<Entidad, Long> {

}
