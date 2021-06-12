import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URL')
db = SQLAlchemy(app)

if 'DEVELOPMENT' in os.environ:
    CORS(app, resources={r"/*": {"origins": "*"}})


class Hotels(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    slug = db.Column(db.String(20), unique=True, nullable=False)
    type = db.Column(db.String(20), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    pets = db.Column(db.Boolean, nullable=False)
    breakfast = db.Column(db.Boolean, nullable=False)
    featured = db.Column(db.Boolean, nullable=False)
    description = db.Column(db.String, nullable=False)
    extras = db.Column(db.ARRAY(db.String), nullable=False)
    images = db.Column(db.ARRAY(db.String), nullable=False)

    def __repr__(self):
        return f'<Hotel {self.name}>'


@app.route("/hotels/")
def hotels():
    hotels = list(Hotels.query.all())
    serialized_hotels = []
    for hotel in hotels:
        serialized_hotels.append({
            "id": hotel.id,
            "name": hotel.name,
            "slug": hotel.slug,
            "type": hotel.type,
            "price": hotel.price,
            "size": hotel.size,
            "capacity": hotel.capacity,
            "pets": hotel.pets,
            "breakfast": hotel.breakfast,
            "featured": hotel.featured,
            "description": hotel.description,
            "extras": hotel.extras,
            "images": hotel.images,

        })
    return({'hotels': serialized_hotels})


if __name__ == "__master__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
