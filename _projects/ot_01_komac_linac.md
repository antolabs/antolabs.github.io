---
layout: project
title: KOMAC LINAC AI Anomaly Detection
description: LSTM Autoencoder for proactive fault detection in Drift Tube Quadrupole magnets
img: assets/img/komac_linac/fig_lstm_autoencoder.png
importance: 1
category: Others
year: "2022 - 2023"
body_class: "project-view"
footer_static: true
card_title: "AI anomaly detection for the KOMAC linac"
institution: "KAERI"
project_group: "AI diagnostics"
summary: "An LSTM autoencoder for early detection of anomalies in quadrupole-magnet operation."
contribution: "Applied AI anomaly detection to KOMAC accelerator operating data as part of the intelligent-operation research program."
evidence: "Operational-data study"
outcome: "Detected early anomaly signatures in five of ten historical voltage-fault cases, 30.7-286.6 minutes before the recorded fault signal-off."
---

## Challenge

**KOMAC** (Korea Multi-purpose Accelerator Complex) operates a 100-MeV proton linear accelerator with Drift Tube LINAC (DTL) structures. The **Drift Tube Quadrupole (DTQ) magnets** focus the beam, but prolonged usage causes enamel wire corrosion and performance degradation. Existing threshold-based alarm systems are reactive, often leading to unnecessary shutdowns.

<div class="row justify-content-center">
    <div class="col-sm-6">
        {% include figure.liquid loading="eager" path="assets/img/komac_linac/fig_dtq_failure.png" zoomable=true alt="DTQ Failure" title="DTQ Failure" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> DTQ magnet structure (left) and failed DTQ after enamel wire corrosion (right)
</div>

---

## Approach: LSTM Autoencoder

<div class="row justify-content-center">
    <div class="col-sm-7">
        {% include figure.liquid loading="lazy" path="assets/img/komac_linac/fig_lstm_autoencoder.png" zoomable=true alt="LSTM Autoencoder" title="LSTM Autoencoder" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> LSTM Autoencoder architecture for DTQ magnet anomaly detection
</div>

### Deep Learning Model

- **LSTM Autoencoder** for time-series anomaly detection
- **6.5 years** of historical operational data (2017-2023)
- **Resistance-based analysis** (voltage/current ratio)
- **MSE loss threshold** of 0.125 for anomaly classification

### Early anomaly detection

- Learn normal operational patterns through reconstruction
- Detect subtle anomalies before threshold-based alarms trigger
- Investigate potential support for preventive maintenance

---

## Results

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/komac_linac/fig_anomaly_detection.png" zoomable=true alt="Anomaly Detection" title="Anomaly Detection" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Anomaly score over time: normal cases vs detected anomaly cases
</div>

| Metric                                   |        Value         |
| :--------------------------------------- | :------------------: |
| Reported overall accuracy                |       **92%**        |
| Voltage-fault cases detected             |     **5 of 10**      |
| Early detection range (detected cases)   | **30.7 - 286.6 min** |
| Mean early detection (detected cases)    |    **166.4 min**     |
| False alarms in normal operating periods |  **2 of 76 (2.6%)**  |

<br>

These results come from a retrospective analysis of historical operating data. Early detection time is measured from the anomaly-score threshold crossing to the recorded voltage-fault signal-off, not to an independently predicted physical breakdown.

The study supports the potential for preventive maintenance; reductions in operational downtime or maintenance costs were not measured.

---

## Publication

**SCIE**

- D.H. Kim, H.S. Kim, H.J. Kwon, Y. Yu, **G. Lee**, "Deep learning-based anomaly detection in Drift Tube Quadrupole operation for the KOMAC LINAC," _Journal of Nuclear Science and Technology_, 62(8), 709-714, 2025. [DOI](https://doi.org/10.1080/00223131.2025.2464742)

---

## Research Project

**(2021-2023)** Establishment of Intelligent Operation Platform for HANARO and Research Facilities, KAERI.
