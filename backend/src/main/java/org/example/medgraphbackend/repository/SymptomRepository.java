package org.example.medgraphbackend.repository;

import org.example.medgraphbackend.model.Symptom;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SymptomRepository extends Neo4jRepository<Symptom, String> {
    // findAll() is already provided
}