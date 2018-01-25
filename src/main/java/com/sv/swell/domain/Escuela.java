package com.sv.swell.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Escuela.
 */
@Entity
@Table(name = "escuela")
public class Escuela implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fundacion")
    private Instant fundacion;

    @OneToOne
    @JoinColumn(unique = true)
    private Entidad entidad;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFundacion() {
        return fundacion;
    }

    public Escuela fundacion(Instant fundacion) {
        this.fundacion = fundacion;
        return this;
    }

    public void setFundacion(Instant fundacion) {
        this.fundacion = fundacion;
    }

    public Entidad getEntidad() {
        return entidad;
    }

    public Escuela entidad(Entidad entidad) {
        this.entidad = entidad;
        return this;
    }

    public void setEntidad(Entidad entidad) {
        this.entidad = entidad;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Escuela escuela = (Escuela) o;
        if (escuela.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), escuela.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Escuela{" +
            "id=" + getId() +
            ", fundacion='" + getFundacion() + "'" +
            "}";
    }
}
