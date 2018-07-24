## Microservice-based E-Commerce System

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg)

### Goal

The goal of this project is to give an example how to build E-Commerce system by using these kind of stuffs:

Concepts & Patterns:

- Microservices
- EDA : Event Driven Architecture
- DDD : Domain Driven Design
- CQRS : Command Query Responsibility Segregation
- Integration Testing

Tools:
- Docker & Docker Compose
- Kafka

Languages:
- Node.js (Typescript)
- Golang

### Project Structure

<p align="center">
<a href="./docs/images/services diagram.jpg" target="_blank">  
  <img src="./docs/images/services diagram.jpg" width="550">
</a>

In this system we derive system to these two (micro)services:

- Authentication Service: authentication & authorization will be handled by this service.
- Ordering Service: browsing product catalog, create an order, manage order's status, etc will be handled by this service.
- Shipment Service: once order's been created, they need to be managed and ship to the customer and that's responsibility for this service.
- Inventory Service: product inventory will be managed inside this service.

### Prerequisites

All you need is Docker with Docker Compose enabled.

