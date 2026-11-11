---
layout: project
title: KOMAC linac AI anomaly detection
description: An LSTM autoencoder for early detection of anomalies in quadrupole-magnet operation.
img: assets/img/komac_linac/fig_lstm_autoencoder.png
importance: 1
category: Others
year: "2022 - 2023"
body_class: "project-view"
footer_static: true
card_title: "AI anomaly detection for the KOMAC linac"
institution: "KAERI"
project_group: "AI fault detection"
summary: "An LSTM autoencoder for early detection of anomalies in quadrupole-magnet operation."
detail_intro: "I applied AI anomaly detection to KOMAC accelerator operating data as part of the intelligent-operation research program."
detail_summary_label: Study result
detail_summary: "Early anomaly signatures in five of ten historical voltage-fault cases, 30.7-286.6 minutes before recorded fault signal-off."
contribution: "Applied AI anomaly detection to KOMAC accelerator operating data as part of the intelligent-operation research program."
evidence: "Operational-data study"
outcome: "Detected early anomaly signatures in five of ten historical voltage-fault cases, 30.7-286.6 minutes before the recorded fault signal-off."
---

<div class="project-overview">
  <section class="project-overview-purpose" aria-labelledby="project-purpose">
    <h2 id="project-purpose">Purpose</h2>
    <p>KOMAC's 100-MeV proton linac relies on drift-tube quadrupole (DTQ) magnets to focus the beam. This study investigates whether historical operating data contain early signs of degradation before conventional voltage-fault alarms.</p>
  </section>
  <section class="project-overview-approach" aria-labelledby="project-approach">
    <h2 id="project-approach">Approach</h2>
    <p>An LSTM autoencoder learns normal resistance patterns from voltage and current records. Reconstruction errors flag anomalies for retrospective comparison with recorded voltage faults.</p>
  </section>
</div>

## Magnet condition

<div class="row justify-content-center">
    <div class="col-sm-6">
        {% include figure.liquid loading="eager" path="assets/img/komac_linac/fig_dtq_failure.png" zoomable=true alt="DTQ Failure" title="DTQ Failure" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    DTQ magnet structure (left) and failed DTQ after enamel wire corrosion (right)
</div>

## Anomaly-detection workflow

<div class="row justify-content-center">
    <div class="col-sm-7">
        {% include figure.liquid loading="lazy" path="assets/img/komac_linac/fig_lstm_autoencoder.png" zoomable=true alt="LSTM Autoencoder" title="LSTM Autoencoder" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    LSTM autoencoder architecture for DTQ magnet anomaly detection
</div>

### Deep learning model

- LSTM autoencoder for time-series anomaly detection
- 6.5 years of historical operating data (2017-2023)
- Resistance computed from the voltage-to-current ratio
- Anomaly threshold at an MSE loss of 0.125

### Early anomaly detection

- Learn normal operational patterns through reconstruction
- Detect anomalies before threshold-based alarms trigger
- Assess whether early detection can support preventive maintenance

## Retrospective evaluation

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/komac_linac/fig_anomaly_detection.png" zoomable=true alt="Anomaly Detection" title="Anomaly Detection" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Anomaly score over time: normal cases vs detected anomaly cases
</div>

| Metric                                   |        Value         |
| :--------------------------------------- | :------------------: |
| Reported overall accuracy                |       **92%**        |
| Voltage-fault cases detected             |     **5 of 10**      |
| Early detection range (detected cases)   | **30.7 - 286.6 min** |
| Mean early detection (detected cases)    |    **166.4 min**     |
| False alarms in normal operating periods |  **2 of 76 (2.6%)**  |

These results come from a retrospective analysis of historical operating data. Detection time is counted from the anomaly-score threshold crossing to the recorded voltage-fault signal-off.

---

## Publications

**SCIE**

- D.H. Kim, H.S. Kim, H.J. Kwon, Y. Yu, **G. Lee**, "Deep learning-based anomaly detection in Drift Tube Quadrupole operation for the KOMAC LINAC," _Journal of Nuclear Science and Technology_, 62(8), 709-714, 2025. [DOI](https://doi.org/10.1080/00223131.2025.2464742)

---

## Research project

**(2021-2023)** Establishment of Intelligent Operation Platform for HANARO and Research Facilities, KAERI.
