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

In this system we derive system to these two (micro)services:

- Ordering: from browsing product catalog, create an order, manage order's status, etc.
- Shipment: once order's been created, they need to be managed and ship to the customer and that's responsibility for this service.

*We gonna start with only these two services first and see what should be improved later*

### Prerequisites

All you need is Docker with Docker Compose enabled.

