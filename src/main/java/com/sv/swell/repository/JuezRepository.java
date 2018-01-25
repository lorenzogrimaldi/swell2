package com.sv.swell.repository;

import com.sv.swell.domain.Juez;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Juez entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JuezRepository extends JpaRepository<Juez, Long> {

}
