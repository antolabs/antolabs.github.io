---
layout: page
title: KOMAC LINAC AI Anomaly Detection
description: LSTM Autoencoder for proactive fault detection in Drift Tube Quadrupole magnets
img: assets/img/komac_linac/fig_lstm_autoencoder.png
importance: 1
category: Others
year: 2022-2023
---

## Challenge

**KOMAC** (Korea Multi-purpose Accelerator Complex) operates a 100-MeV proton linear accelerator with Drift Tube LINAC (DTL) structures. The **Drift Tube Quadrupole (DTQ) magnets** focus the beam, but prolonged usage causes enamel wire corrosion and performance degradation. Existing threshold-based alarm systems are reactive, often leading to unnecessary shutdowns.

<div class="row justify-content-center">
    <div class="col-sm-6">
        {% include figure.liquid loading="eager" path="assets/img/komac_linac/fig_dtq_failure.png" title="DTQ Failure" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    DTQ magnet structure (left) and failed DTQ after enamel wire corrosion (right)
</div>

---

## Approach: LSTM Autoencoder

<div class="row justify-content-center">
    <div class="col-sm-7">
        {% include figure.liquid loading="eager" path="assets/img/komac_linac/fig_lstm_autoencoder.png" title="LSTM Autoencoder" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    LSTM Autoencoder architecture for DTQ magnet anomaly detection
</div>

### Deep Learning Model
- **LSTM Autoencoder** for time-series anomaly detection
- **6.5 years** of historical operational data (2017-2023)
- **Resistance-based analysis** (voltage/current ratio)
- **MSE loss threshold** of 0.125 for anomaly classification

### Proactive Detection
- Learn normal operational patterns through reconstruction
- Detect subtle anomalies before threshold-based alarms trigger
- Enable predictive maintenance scheduling

---

## Results

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="eager" path="assets/img/komac_linac/fig_anomaly_detection.png" title="Anomaly Detection" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Anomaly score over time: normal cases vs detected anomaly cases
</div>

| Metric | Value |
|:-------|:-----:|
| Accuracy | **92%** |
| Early Detection Range | **30.7 - 286.6 min** |
| Mean Early Detection | **166.4 min** |
| False Positive Rate | **2.6%** |

<br>

- Detected voltage anomalies **up to 286 minutes** before potential breakdown
- Reduced **unnecessary shutdowns** through proactive detection
- Enabled **optimized maintenance planning** and spare part management

---

## Publication

**SCIE**
- D.H. Kim, H.S. Kim, H.J. Kwon, Y. Yu, **G. Lee**, "Deep learning-based anomaly detection in Drift Tube Quadrupole operation for the KOMAC LINAC," *Journal of Nuclear Science and Technology*, 2025.

---

## Research Project

**(2021-2023)** Establishment of Intelligent Operation Platform for HANARO and Research Facilities, KAERI.
