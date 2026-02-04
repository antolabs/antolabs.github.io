---
layout: page
title: Projects
permalink: /projects/
description: Research projects in AI-driven design optimization, thermo-fluid systems, electromagnetic devices, and nuclear engineering applications
nav: true
nav_order: 4
display_categories: [Thermo-fluid devices, Electromagnetic devices, Others]
horizontal: false
---

<!-- pages/projects.md -->
<p style="color: var(--global-text-color-light); font-size: 0.9rem; margin-bottom: 1.5rem;">Click on each project card for more details.</p>
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}" style="text-decoration: none;">
    <h2 style="color: var(--global-text-color); border-bottom: 3px solid #2698BA; padding: 0.5rem 0; margin: 2rem 0 1rem 0; text-align: left; font-weight: 700; font-size: 1.4rem;">{{ category }}</h2>
  </a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
