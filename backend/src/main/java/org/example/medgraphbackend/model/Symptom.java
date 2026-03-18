package org.example.medgraphbackend.model;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;

@Node("Symptom")
public class Symptom {

    @Id
    private String name;  // Using name as ID since it's likely unique

    @Property("degreeCentrality")
    private Double degreeCentrality;

    @Property("wcc_id")
    private Long wccId;

    // Default constructor
    public Symptom() {}

    // Constructor with fields
    public Symptom(String name, Double degreeCentrality, Long wccId) {
        this.name = name;
        this.degreeCentrality = degreeCentrality;
        this.wccId = wccId;
    }

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getDegreeCentrality() { return degreeCentrality; }
    public void setDegreeCentrality(Double degreeCentrality) { this.degreeCentrality = degreeCentrality; }

    public Long getWccId() { return wccId; }
    public void setWccId(Long wccId) { this.wccId = wccId; }
}