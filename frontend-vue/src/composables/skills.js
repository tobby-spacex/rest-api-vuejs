import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default function useSkills()
{
    const skills = ref([]);
    const skill  = ref([]);
    const errors = ref([]);
    const router = useRouter();

    const getSkills = async () => {
        const response = await axios.get("http://localhost:8000/api/v1/skills");
        skills.value = response.data.data;
    };

    const getSkill = async (id) => {
        const response = await axios.get(`http://localhost:8000/api/v1/skills/${id}`);
        skill.value = response.data.data;
    };

    const storeSkill = async (data) => {
       try {
          await axios.post("http://localhost:8000/api/v1/skills", data);
          await router.push({name: "SkillIndex"});
       } catch (error) {
            if(error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
       }
    };

    const updateSkill = async (id) => {
        try {
            await axios.put(`http://localhost:8000/api/v1/skills/${id}`, skill.value);
            await router.push({name: "SkillIndex"});
        } catch (error) {
            if(error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    const destroySkill = async (id) => {
        if(!window.confirm('Are you sure ?')) {
            return;
        }
        
        await axios.delete(`http://localhost:8000/api/v1/skills/${id}`);
        await getSkills();
    }

    return { 
        skills,
        skill,
        errors,
        getSkills,
        getSkill,
        updateSkill,
        storeSkill,
        destroySkill
    }
}