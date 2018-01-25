package com.sv.swell.repository;

import com.sv.swell.domain.Miembro_junta;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Miembro_junta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Miembro_juntaRepository extends JpaRepository<Miembro_junta, Long> {

}
