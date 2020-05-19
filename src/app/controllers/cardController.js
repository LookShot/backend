const express = require("express");
const Card = require("../models/Card");
const parseStringAsArray = require("../../utils/parseStringAsArray");

module.exports = {
    //Puxar todos o card de um usuário*** terminar//
    async cards_user(req, res) {
        const user = req.userId;
        try {
            const cards = await Card.find({ user });
            return res.send({ cards });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: "Erro Loading cards" });
        }
    },

    //**********Criação dos Cards Relacionado ao User**************/
    async creat_card_user(req, res) {
        try {
            const user = req.userId;
            //////////////////////////
            // const n_card = await Card.find({ user });
            //////////////////////////
            let n_card = await Card.findOneAndRemove({ user });
            n_card = [];
            /////////////////////////

            console.log(n_card);

            if (n_card.length < 1) {
                const { name, description, categoria, cep, picture, phone } = req.body;
                console.log(
                    JSON.stringify(req.body, null, 4) +
                    "---------------------------------"
                );
                const cards = await Card.create({
                    name,
                    description,
                    categoria,
                    user,
                    cep,
                    picture,
                    phone
                });

                await cards.save();

                return res.send({ cards });
            } else {
                return res.send({ message: "Número limite de cards alcançados" });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: "erro na criação do Card" });
        }
    },

    //------Atualizando um Card----------/
    async update_card_user(req, res) {
        try {
            const { name, description, categoria, location } = req.body;

            const cards = await Card.findByIdAndUpdate(
                req.params.cardId, {
                    name,
                    description,
                    categoria,
                    location
                }, { new: true }
            );

            return res.send({ cards });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: "erro ao atualizar um Card" });
        }
    },

    async delete_card(req, res) {
        try {
            const cards = await Card.findByIdAndRemove(req.params.cardId);

            return res.send(`Card ${cards.name} deletado`);
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: "erro em deltar um projeto" });
        }
    },

    async seach_cards(req, res) {
        // const categoria= req.query.categoria
        // const techsArray = parseStringAsArray(categoria);
        // return res.send (techsArray);

        try {
            const categoria = req.query.categoria;

            const techsArray = parseStringAsArray(categoria);

            const cards = await Card.find({
                categoria: {
                    $in: techsArray
                }
            }).populate("user");

            return res.send({ cards });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: "Erro Loading cardss" });
        }
    }, 
    
    async cards_user(req, res) {

        try {
            const cards = await Card.find().populate("user");
            return res.send({ cards });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: "Erro Loading cards" });
        }
    }
};