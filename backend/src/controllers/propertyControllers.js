const models = require("../models");

const browse = (req, res) => {
  models.property
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.property
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const property = req.body;

  // TODO validations (length, format...)

  property.id = parseInt(req.params.id, 10);

  models.property
    .update(property)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.property
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const search = (req, res) => {
  let result = {};
  models.property.find(req.params.id).then(([rows]) => {
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      result = {
        property: rows[0],
      };
    }
  });

  models.property_has_equipment
    .findWithProperty(req.params.id)
    .then(([equipment]) => {
      result = {
        ...result,
        equipments: equipment,
      };
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  let propertyId = 0;
  const property = JSON.parse(req.body.property);
  const equipments = JSON.parse(req.body.equipments);
  const arryfile = req.files.map((elem) => elem.filename);
  property.description.image = arryfile;

  models.property
    .insert(property)
    .then(([result]) => {
      propertyId = result.insertId;
      const equipmentsPromise = equipments.map((elem) => {
        return models.property_has_equipment.insert({
          equipment_id: elem.id,
          property_id: propertyId,
        });
      });
      return Promise.all([...equipmentsPromise]);
    })
    .then(() => {
      res.location(`/property/${propertyId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  search,
};
