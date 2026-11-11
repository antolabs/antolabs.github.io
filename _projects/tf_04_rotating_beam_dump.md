---
layout: project
title: "FRIB rotating beam dump: engineering development"
card_title: Rotating beam dump development
description: Leading the rotating beam-dump upgrade beyond the static design, targeting 100 kW primary beam power by 2028 through integrated engineering and multiphysics simulation.
summary: Leading development from manufacturability assessment through fabrication and installation.
detail_intro: I lead the FRIB rotating beam-dump effort from manufacturability assessment through fabrication and installation.
detail_summary_label: Development target
detail_summary: "100 kW primary beam power by 2028."
institution: FRIB
year: "2024 - Present"
body_class: project-view
footer_static: true
featured: true
featured_order: 2
project_kind: engineering
project_group: Thermal-fluid engineering
scope_note: Upgrade beyond 50 kW, targeting 100 kW primary beam power by 2028.
---

<div class="project-overview">
  <section class="project-overview-purpose" aria-labelledby="project-purpose">
    <h2 id="project-purpose">Purpose</h2>
    <p>The rotating beam dump is the next upgrade beyond the <a href="{{ '/projects/tf_01_frib_beam_dump/' | relative_url }}">static beam dump</a>, intended for primary beam power above 50 kW. Rotation spreads the heat load around the circumference, while a thin shell lets the beam deposit energy directly in the cooling water.</p>
  </section>
  <section class="project-overview-approach" aria-labelledby="project-approach">
    <h2 id="project-approach">Approach</h2>
    <p>The project integrates thermal-hydraulic design with radiation, sealing, manufacturing, and installation requirements. I perform thermal-fluid, structural, and electromagnetic simulations.</p>
  </section>
</div>

<section class="project-simulations" aria-labelledby="project-simulations-heading">
  <h2 id="project-simulations-heading">Simulation views</h2>
  {% include projects/rotating-simulations.liquid %}
</section>

<section class="project-ongoing" aria-labelledby="project-ongoing-heading">
  <h2 id="project-ongoing-heading">Ongoing AI methods</h2>
  <p class="project-ongoing-intro">The rotating beam dump is the current application for two AI methods in development.</p>
  <div class="project-ongoing-list">
    <section aria-labelledby="ongoing-bisto">
      <h3 id="ongoing-bisto">BiSTO</h3>
      <p>Binary Surrogate-based Topology Optimization uses AI to search solid-fluid layouts for the cooling channels and checks each design with physics-based simulation.</p>
    </section>
    <section aria-labelledby="ongoing-surrogate">
      <h3 id="ongoing-surrogate">Deep learning surrogate</h3>
      <p>Predicts the thermal response of the rotating beam dump quickly, so many design options can be checked without a full simulation for each one.</p>
    </section>
  </div>
</section>
