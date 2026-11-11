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
related_heading: Related research
related_intro: The rotating beam dump provides a current research case for BiSTO and deep learning surrogate modeling.
related_notice: Detailed application studies will be shared after publication.
related_projects:
  - slug: ai_01_bisto
    description: AI-guided search for cooling-channel topology.
  - slug: ai_02_thermal_surrogate
    description: Fast thermal predictions for repeated design evaluations.
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
