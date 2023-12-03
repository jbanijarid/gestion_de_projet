<script>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

export default {
  setup() {
    const apercusRef = ref(null);
    const section1Ref = ref(null);
    const section2Ref = ref(null);
    const section3Ref = ref(null);
    const image1Ref = ref(null);
    const image2Ref = ref(null);
    const image3Ref = ref(null);

    const handleMouseOver = (index) => {
      gsap.to(this[`image${index}Ref`], { scale: 1.1, duration: 0.3, ease: 'power3.out' });
    };

    const handleMouseOut = (index) => {
      gsap.to(this[`image${index}Ref`], { scale: 1, duration: 0.3, ease: 'power3.out' });
    };

    onMounted(() => {
      gsap.from(apercusRef.value, { opacity: 0, duration: 1 });
      gsap.from([section1Ref.value, section2Ref.value, section3Ref.value], { opacity: 0, y: 50, stagger: 0.2, duration: 1 });

      gsap.from(image1Ref.value, { opacity: 0, x: -50, duration: 1 });
      gsap.from(image2Ref.value, { opacity: 0, x: 50, duration: 1 });
      gsap.from(image3Ref.value, { opacity: 0, x: -50, duration: 1 });
    });

    return {
      apercusRef,
      section1Ref,
      section2Ref,
      section3Ref,
      image1Ref,
      image2Ref,
      image3Ref,
      handleMouseOver,
      handleMouseOut,
    };
  },
};
</script>


<template>
  <div id="apercus" class="container" ref="apercusRef">
    <h2 class="main-title">Planifiez, gérez, collaborez et suivez facilement</h2>

    <div class="images-container" ref="section1Ref" @mouseover="handleMouseOver(1)" @mouseout="handleMouseOut(1)">
      <b-row>
        <b-col lg="6" class="image-text">
          <p class="section-title">Un outil de gestion de projets conçu pour le travail d'équipe</p>
          <p class="image-description">Créez et planifiez vos projets, visualisez vos tâches, suivez chaque étape avec un tableau Kanban interactif</p>
        </b-col>
        <b-col lg="6">
          <div class="image-item" ref="image1Ref">
            <img src="../assets/project.png" alt="projet" class="image">
          </div>
        </b-col>
      </b-row>
    </div>


    <div class="images-container" ref="section2Ref" @mouseover="handleMouseOver(2)" @mouseout="handleMouseOut(2)">
      <b-row>
        <b-col lg="6" class="image-text">
          <p class="section-title">Découvrez l'ensemble de vos projets réunis en un seul lieu</p>
        </b-col>
        <b-col lg="6">
          <div class="image-item" ref="image2Ref">
            <img src="../assets/listeProjects.png" alt="liste de projet" class="image">
          </div>
        </b-col>
      </b-row>
    </div>


    <div class="images-container" ref="section3Ref" @mouseover="handleMouseOver(3)" @mouseout="handleMouseOut(3)">
      <b-row>
        <b-col lg="6" class="image-text">
          <p class="section-title">Accélérez vos projets en planifiant de manière agile avec des sprints, tout en boostant la productivité grâce à des tableaux Kanban dédiés à chaque sprint</p>
        </b-col>
        <b-col lg="6">
          <div class="image-item" ref="image3Ref">
            <img src="../assets/sprint.png" alt="Capture d'écran de la page d'accueil" class="image">
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>


<style>

.image-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.image-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#apercus {
  text-align: center;
  margin-top: 50px;
}

.main-title {
  font-size: 36px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #2e3e4e;
}

.images-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 60px;
}

.image-text {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-title {
  font-size: 24px;
  margin-bottom: 15px;
  font-weight: bold;
  color: #2e3e4e;
}

.image-item {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.image {
  width: 100%;
  height: auto;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.image:hover {
  transform: scale(1.05);
}

.image-description {
  margin: 20px 0;
  color: #555;
  font-size: 18px;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
