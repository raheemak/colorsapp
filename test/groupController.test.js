const express = require("express");
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const path = require('path')
const fs = require('fs');
const Group = require("../server/models/groupModel")

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/index');
let should = chai.should();
let expect = chai.expect;


const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZ3TTZRV2w5dHVLM3pLcGFWLWNXNiJ9.eyJpc3MiOiJodHRwczovL2Rldi1uemU1dmZ4eS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGJDTmJ3cGZ1VEtOdlVPT09UUlhOZEYzUk1SejZIZjNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY29sb3JzYXBwcmFoZWVtYS5oZXJva3VhcHAuY29tLyIsImlhdCI6MTY1NTA4MDE1MSwiZXhwIjoxNjU1MTY2NTUxLCJhenAiOiJMYkNOYndwZnVUS052VU9PT1RSWE5kRjNSTVJ6NkhmMyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.SQyWdRhREVBr3TH33ikIKghXE81xGf9bDPmS7Bd4m9LiSWUCR9TI2N1i6Xq3JL6jdTcoQn0gEq092N7PRMqJXQutg5KZrsOVobXv49qMoW-_7lHPEWQnTZHgtHvHzXy2eUKmm5WhtbyAGZep_ic3DwVk_slXXC_2nFa4J7NZitGJ-8VItGwbICEjMnYaDe6qzicnpinduX8kn6UznajMWoOsnOUm8b7VIUBB4mTVWPQIfU3YnS8qQ5-tDFwb0jdIUHyeE_2H1Y1U3YH_Yr7Kwd-747nOSUOoeThv1ZNwYi8t330NUUKHLall8rhPuvKZgmRSwxmNwwS2l73DuT4T3w'

chai.use(chaiHttp);

describe('/GET colors from database', () => {
  it('it should GET all colors', (done) => {
    chai.request(server)
      .get('/api/v1/colors')
      .set({ "Authorization": `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.colors.should.be.a('array');
        res.body.colors.should.contain("red")
        res.body.colors.should.contain("green")
        res.body.colors.should.contain("blue")
        done();
      });
  });

  it('it should GET users for color:red', (done) => {
    chai.request(server)
      .get('/api/v1/color/red')
      .set({ "Authorization": `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.groups.Group2.should.be.a('array');
        res.body.groups.Group2.should.contain("Jane")

        done();
      });
  });

  it('it should GET users for color:all', (done) => {
    chai.request(server)
      .get('/api/v1/color')
      .set({ "Authorization": `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        for (result of res.body.result.blue){
          expect([ 'John' ,'Howard' ]).to.include(Object.values (result)[0][0])
        }
        done();
      });
  });
});


describe('/POST user to database', () => {
  it('it should POST existing user and update color', (done) => {
  
    chai.request(server)
    .post('/api/v1/user?username=Raheema&group=Group4&color=pink')
    .set({ "Authorization": `Bearer ${token}` })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.username.should.contain("Raheema")
      res.body.group.should.contain("Group1")
      res.body.color.should.contain("pink")
      done();
    });


  })

  it('it should POST new user in existing group', (done) => {
  
    //random number so you always get a new user name 
    const randomNumber = Math.random() + Math.random() +  Math.random();

    chai.request(server)
    .post(`/api/v1/user?username=Will${randomNumber}&group=Group4&color=orange`)
    .set({ "Authorization": `Bearer ${token}` })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.username.should.contain("Will"+randomNumber)
      res.body.group.should.contain("Group4")
      res.body.color.should.contain("orange")
      done();
    });
  })


  it('it should POST new user and create new group', (done) => {
  
    //random number so you always get a new user name 
    const randomNumber = Math.random() + Math.random() +  Math.random();

    chai.request(server)
    .post(`/api/v1/user?username=Will${randomNumber}&group=Group${randomNumber}&color=orange`)
    .set({ "Authorization": `Bearer ${token}` })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.username.should.contain("Will"+randomNumber)
      res.body.group.should.contain("Group"+randomNumber)
      res.body.color.should.contain("orange")
      done();
    });
  })

})
