const router = require("express").Router();
const Person = require("../model/Person");

//ROTAS PESSOA -POST
router.post("/", async (req, res) => {
	const { name, email, contact } = req.body;

	if ((!name && !email) || !contact) {
		res.status(400).json({ erro: "Erro ao fazer requisicao" });
		return;
	}
	const person = { name, email, contact };
	try {
		await Person.create(person);
		res.status(201).json({ message: "pessoa criada com sucesso" });
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

//ROTAS PESSOA -GET
router.get("/", async (req, res) => {
	try {
		const people = await Person.find();
		res.status(200).json(people);
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const people = await Person.findById({ _id: id });
		if (!people) {
			res.status(404).json({
				message: "usuario inexistente ou nao encontrado",
			});
			return;
		}
		res.status(200).json(people);
	} catch (error) {
		res.status(500).json({ erro: error });
	}
});

//ROTAS PESSOA -PUT
router.put("/:id", async (req, res) => {
	const id = req.params.id;

	const { name, email, contact } = req.body;

	const person = { name, email, contact };
	try {
		const updatePerson = await Person.updateOne({ _id: id }, person);
		if (updatePerson.matchedCount === 0) {
			res.status(400).json({
				message: "houve um erro durante atualizacao",
			});
			return;
		}

		res.status(200).json(person);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

//ROTAS PESSOA -DELETE
router.delete("/:id", async (req, res) => {
	const id = req.params.id;
	const people = await Person.findById({ _id: id });
	if (!people) {
		res.status(404).json({
			message: "usuario inexistente ou nao encontrado",
		});
		return;
	}
	try {
        await Person.deleteOne({_id:id})
        res.status(200).json({message: "Usuario teletado com sucesso!"})
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

module.exports = router;
