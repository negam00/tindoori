import React from "react";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "./RecipeCard.css";
import TinderCard from "react-tinder-card";
import * as PropTypes from "prop-types";
import firebase from "firebase";

export default function RecipeCard({ recipe }) {
  const onSwipe = (direction) => {
    const fs = firebase.firestore();
    const auth = firebase.auth();
    const doc = fs
      .collection("consumer")
      .doc(auth.currentUser.uid)
      .collection("recipes")
      .doc("recipes");

    switch (direction) {
      case "right":
        doc.update({
          likes: firebase.firestore.FieldValue.arrayUnion(recipe.id),
        });
        break;
      case "left":
        doc.update({
          dislikes: firebase.firestore.FieldValue.arrayUnion(recipe.id),
        });
        break;
      default:
        break;
    }
  };

  return (
    <TinderCard
      className="swipe"
      onSwipe={(dir) => onSwipe(dir, recipe)}
      preventSwipe={["up", "down"]}
    >
      <Card id="recipe-card">
        <Card.Img id="recipe-img" src={recipe.imgPath} />
        <Card.Body>
          <Card.Title className="recipe-text">{recipe.name}</Card.Title>
          <Card.Text className="recipe-text">{recipe.description}</Card.Text>
          <Card.Text className="recipe-cook-time">
            {recipe.cookingTime} min
          </Card.Text>
        </Card.Body>
      </Card>
    </TinderCard>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};
