import { useEffect, useState } from 'react';
import cookies from 'next-cookies';
import { verifyJwt } from '../../../utils/jwt';
import Layout from '../../layout';
import styles from "/styles/Home.module.css";
import moment from 'moment';
import 'moment/locale/fr';
import { useRouter } from 'next/router';
import { getAllDiagnostics } from '../../../db/handlers/diagnostic_handlers';
import Head from 'next/head';
import RadarChartComponent from '../../../components/Chart/RadarChartComponent';
import { generateChartPlaceTravailData, generateInclusionRadialChartData, generatePouvoiragirRadialChartData, generateSatisfactionRadialChartData, generateSecuRadialChartData, generateSensRadialChartData } from '../../../utils/chartFunctions';
import { asymetriqueInclusion, asymetriquePouvoiragir, asymetriqueSatisfaction, asymetriqueSecurite, asymetriqueSens, generateInclusionData, generatePouvoiragirData, generateSatisfactionData, generateSecuData, generateSensData, generateTotalData, positionEtatPresent, positionNiveauPresence, positionSituationPsychosociale } from '../../../utils/otherFunctions';
import ChartComponent from '../../../components/Chart/ChartComponent';
import ChartComponentRole from '../../../components/Result/ChartComponentRole';
import PsychosocialeChart from '../../../components/Result/PsychosocialeChart';
import PlaceTravailChart from '../../../components/Result/PlaceTravailChart';
import ImageChangingOnValue from '../../../components/PlanAction/ImageChangingOnValue';

const ObjectList = ({ user, thisUser, diagnostics }) => {
    const [objects, setAllObjects] = useState([])
    const [view, setView] = useState(false)

    useEffect(() => {
        setAllObjects(JSON.parse(diagnostics))
    }, [])

    const router = useRouter()
    const [selectedObjects, setSelectedObjects] = useState([]);

    const handleObjectSelect = (object) => {
        setView(false)
        const isSelected = selectedObjects.includes(object);
        if (isSelected) {
            setSelectedObjects(selectedObjects.filter((selected) => selected !== object));
        } else {
            setSelectedObjects([...selectedObjects, object]);
        }
    };

    const handleSubmit = () => {
        const selectedFormData = selectedObjects.map((object) => object.form_data);
        // console.log(selectedFormData);
        // Perform further actions with selectedFormData

        if (selectedFormData.length != 2) {
            alert("Veuiller selectionner exactement deux éléments à comparer.")
            return
        }

        setView(true)
    };

    const sortedObjects = objects.sort((a, b) => -(new Date(a.date) - new Date(b.date)));

    return (
        <>
            <Head>
                <title>Comparaison de deux rapports QVT Personnelle</title>
                 
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout user={user}>
                {
                    (user.role == "Manager" || user.role == "User") ?
                        <main className={`${styles.main} flex-col pt-5`} style={{ justifyContent: "flex-start" }}>
                            <div className='flex flex-col items-center justify-center mb-3'>
                                <div className='flex items-center justify-center gap-10'>
                                    <h1 className='text-center text-2xl my-5'>Liste des rapports QVT personnelle</h1>
                                    <button onClick={() => {
                                        router.push({
                                            pathname: "/result/perso",
                                        });
                                    }} className='h-auto w-auto py-3 px-5 sm:text-xs'> Consulter les rapports QVT personnelle</button>
                                </div>
                                <ul className='flex gap-5 flex-wrap py-5 justify-center items-center px-12'>
                                    {sortedObjects.map((object) => (
                                        <li
                                            className='h-28 w-28 flex items-center text-center cursor-pointer hover:scale-[1.1]'
                                            key={object.date}
                                            onClick={() => handleObjectSelect(object)}
                                            style={{ backgroundColor: selectedObjects.includes(object) ? 'lightblue' : 'white' }}
                                        >
                                            {moment(object.date).format('D MMMM YYYY  HH:mm:ss')}
                                        </li>
                                    ))}
                                </ul>
                                <div className='flex mx-2 gap-2'>
                                    <button onClick={handleSubmit} className='h-auto w-auto py-3 px-5'>Visualiser la comparaison</button>
                                </div>
                            </div>
                            {view &&
                                <div className='flex flex-col gap-5 my-10'>
                                    <div className="w-full min-h-max flex">
                                        <div className='w-[50%] h-[75%] flex justify-center items-center my-10 pl-5 md:w-full'>
                                            <span className='bg-white px-3 py-2 rounded-md'>{moment(selectedObjects[0].date).format('D MMMM YYYY  HH:mm:ss')}</span>
                                        </div>
                                        <div className='w-[50%] h-[75%] flex justify-center items-center my-10 pl-5 md:w-full'>
                                            <span className='bg-white px-3 py-2 rounded-md'>{moment(selectedObjects[1].date).format('D MMMM YYYY  HH:mm:ss')}</span>
                                        </div>
                                    </div>
                                    <div className="w-full min-h-max flex">
                                        <div className='w-[50%] h-[75%] flex justify-center items-center my-10 pl-5 md:w-full'>
                                            <ImageChangingOnValue
                                                title={"Mon état présent"}
                                                subtitle={"physique & émotionnel"}
                                                images={[
                                                    "/result/LowEtat.png",
                                                    "/result/MiddleEtat.png",
                                                    "/result/HighEtat.png",
                                                ]}
                                                position={positionEtatPresent(selectedObjects[0].form_data)}
                                            />
                                            <ImageChangingOnValue
                                                title={"Mon niveau de présence"}
                                                subtitle={"disponibilité & motivation"}
                                                images={[
                                                    "/result/VeryLowPresence.png",
                                                    "/result/LowPresence.png",
                                                    "/result/MiddlePresence.png",
                                                    "/result/HighPresence.png",
                                                ]}
                                                position={positionNiveauPresence(selectedObjects[0].form_data)}
                                            />
                                        </div>
                                        <div className='w-[50%] h-[75%] flex justify-center items-center my-10 pl-5 md:w-full'>
                                            <ImageChangingOnValue
                                                title={"Mon niveau de présence"}
                                                subtitle={"disponibilité & motivation"}
                                                images={[
                                                    "/result/VeryLowPresence.png",
                                                    "/result/LowPresence.png",
                                                    "/result/MiddlePresence.png",
                                                    "/result/HighPresence.png",
                                                ]}
                                                position={positionNiveauPresence(selectedObjects[1].form_data)}
                                            />
                                            <ImageChangingOnValue
                                                title={"Mon état présent"}
                                                subtitle={"physique & émotionnel"}
                                                images={[
                                                    "/result/LowEtat.png",
                                                    "/result/MiddleEtat.png",
                                                    "/result/HighEtat.png",
                                                ]}
                                                position={positionEtatPresent(selectedObjects[1].form_data)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full min-h-max flex">
                                        <PsychosocialeChart
                                            title={
                                                <span className="text-[#FFAF81]">Ma situation <br /> psychosociale</span>
                                            }
                                            description={
                                                <>
                                                    Sentiment général de plaisir & satisfaction <br /> et impact du
                                                    contexte vie pro/vie perso
                                                </>
                                            }
                                            value={positionSituationPsychosociale(selectedObjects[0].form_data)}
                                            compare={false}
                                        />
                                        <PsychosocialeChart
                                            title={
                                                <span className="text-[#FFAF81]">Ma situation <br /> psychosociale</span>
                                            }
                                            description={
                                                <>
                                                    Sentiment général de plaisir & satisfaction <br /> et impact du
                                                    contexte vie pro/vie perso
                                                </>
                                            }
                                            value={positionSituationPsychosociale(selectedObjects[1].form_data)}
                                            compare={true}
                                        />
                                    </div>
                                    <div className="w-full min-h-max flex">
                                        <PlaceTravailChart
                                            formData={selectedObjects[0].form_data}
                                            chartFunction={generateChartPlaceTravailData}
                                            title={
                                                <>
                                                    <span className="text-blue-600">
                                                        Place du travail <br /> dans ma vie
                                                    </span>
                                                </>
                                            }
                                        />

                                        <PlaceTravailChart
                                            formData={selectedObjects[1].form_data}
                                            chartFunction={generateChartPlaceTravailData}
                                            title={
                                                <>
                                                    <span className="text-blue-600">
                                                        Place du travail <br /> dans ma vie
                                                    </span>
                                                </>
                                            }
                                        />
                                    </div>
                                    <div className="w-full min-h-max flex">
                                        <ChartComponentRole
                                            formData={selectedObjects[0].form_data}
                                            title={
                                                <span className="text-[#AA5CB7]">
                                                    Les fonctions du travail pour moi
                                                </span>
                                            }
                                        />
                                        <ChartComponentRole
                                            formData={selectedObjects[1].form_data}
                                            title={
                                                <span className="text-[#AA5CB7]">
                                                    Les fonctions du travail pour moi
                                                </span>
                                            }
                                        />
                                    </div>
                                    <div className="w-full min-h-max flex gap-5 justify-center">
                                        <div className='flex flex-col gap-2 sm:items-center'>
                                            <div className='bg-white opacity-60 p-2 rounded-lg w-[400px] h-max flex flex-col justify-start items-center sm:w-max-[300px] sm:w-[80%]'>
                                                <div className="flex flex-col justify-center items-center gap-1">
                                                    <div className=''>
                                                        <p className='font-bold text-xl mt-5 text-center text-[#325ba8]'>Mon taux d&apos;harmonie générale</p>
                                                    </div>
                                                    <div className="font-thin text-customGray italic text-center text-xs">
                                                        Niveau de satisfaction de mes besoins
                                                        <br /> au travail actuellement
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='text-[#325ba8] font-bold text-2xl my-4'>{generateTotalData(selectedObjects[0].form_data).Harmonie}%</p>
                                                </div>
                                            </div>
                                            <div className='bg-white opacity-60 p-4 rounded-lg w-[400px] h-max flex flex-col justify-start items-center sm:w-max-[300px] sm:w-[80%]'>
                                                <div className="flex flex-col justify-center items-center gap-1">
                                                    <div>
                                                        <p className='font-bold text-xl mt-5 text-center text-[#b82baa]'>Mon indice QVT global</p>
                                                    </div>
                                                    <div className="font-thin text-customGray italic text-center text-xs">
                                                        La façon dont je me sens <br /> au travail actuellement
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='text-[#b82baa] font-bold text-2xl my-4'>{generateTotalData(selectedObjects[0].form_data).QVT}%</p>
                                                </div>
                                            </div>
                                            <div className='bg-white opacity-60 p-4 rounded-lg w-[400px] h-max flex flex-col justify-start items-center sm:w-max-[300px] sm:w-[80%]'>
                                                <div className='flex flex-col justify-center text-center'>
                                                    <span className='font-bold text-xl mt-5 text-center text-[#c67524]'>Zone grise</span>
                                                    <span className='font-thin text-customGray italic text-center text-xs'>Occurence de réponses neutres</span>
                                                    <p className='text-[#c67524] font-bold text-2xl my-4'>{generateTotalData(selectedObjects[0].form_data).Grise}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2 sm:items-center'>
                                            <div className='bg-white opacity-60 p-2 rounded-lg w-[400px] h-max flex flex-col justify-start items-center sm:w-max-[300px] sm:w-[80%]'>
                                                <div className="flex flex-col justify-center items-center gap-1">
                                                    <div className=''>
                                                        <p className='font-bold text-xl mt-5 text-center text-[#325ba8]'>Mon taux d&apos;harmonie générale</p>
                                                    </div>
                                                    <div className="font-thin text-customGray italic text-center text-xs">
                                                        Niveau de satisfaction de mes besoins
                                                        <br /> au travail actuellement
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='text-[#325ba8] font-bold text-2xl my-4'>{generateTotalData(selectedObjects[1].form_data).Harmonie}%</p>
                                                </div>
                                            </div>
                                            <div className='bg-white opacity-60 p-4 rounded-lg w-[400px] h-max flex flex-col justify-start items-center sm:w-max-[300px] sm:w-[80%]'>
                                                <div className="flex flex-col justify-center items-center gap-1">
                                                    <div>
                                                        <p className='font-bold text-xl mt-5 text-center text-[#b82baa]'>Mon indice QVT global</p>
                                                    </div>
                                                    <div className="font-thin text-customGray italic text-center text-xs">
                                                        La façon dont je me sens <br /> au travail actuellement
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='text-[#b82baa] font-bold text-2xl my-4'>{generateTotalData(selectedObjects[1].form_data).QVT}%</p>
                                                </div>
                                            </div>
                                            <div className='bg-white opacity-60 p-4 rounded-lg w-[400px] h-max flex flex-col justify-start items-center sm:w-max-[300px] sm:w-[80%]'>
                                                <div className='flex flex-col justify-center text-center'>
                                                    <span className='font-bold text-xl mt-5 text-center text-[#c67524]'>Zone grise</span>
                                                    <span className='font-thin text-customGray italic text-center text-xs'>Occurence de réponses neutres</span>
                                                    <p className='text-[#c67524] font-bold text-2xl my-4'>{generateTotalData(selectedObjects[1].form_data).Grise}%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full min-h-max flex justify-center">
                                        <div className='w-[50%] h-[75%] flex justify-center items-center my-10 pl-5 md:w-full'>
                                            <ChartComponent formData={selectedObjects[0].form_data} step="" />
                                        </div>
                                        <div className='w-[50%] h-[75%] flex justify-center items-center my-10 pl-5 md:w-full'>
                                            <ChartComponent formData={selectedObjects[1].form_data} step="" />
                                        </div>
                                    </div>
                                    <div className="w-full min-h-max flex justify-center">
                                        <RadarChartComponent
                                            formData={selectedObjects[0].form_data}
                                            chartFunction={generateSecuRadialChartData}
                                            chartDataFunction={generateSecuData}
                                            chartAsymetriqueFuntion={asymetriqueSecurite}
                                            title={
                                                <>
                                                    Ma QVT selon mes besoins de{" "}
                                                    <span className="text-orange-500">Sécurité</span>
                                                </>
                                            }
                                            bgcolor1={"bg-securite1"}
                                            bgcolor2={"bg-securite2"}
                                            noDisplayTitle
                                        />
                                        <RadarChartComponent
                                            formData={selectedObjects[1].form_data}
                                            chartFunction={generateSecuRadialChartData}
                                            chartDataFunction={generateSecuData}
                                            chartAsymetriqueFuntion={asymetriqueSecurite}
                                            title={
                                                <>
                                                    Ma QVT selon mes besoins de{" "}
                                                    <span className="text-orange-500">Sécurité</span>
                                                </>
                                            }
                                            bgcolor1={"bg-securite1"}
                                            bgcolor2={"bg-securite2"}
                                            noDisplayTitle
                                        />
                                    </div>
                                    <div className="w-full min-h-max flex justify-center">
                                        <RadarChartComponent
                                            formData={selectedObjects[0].form_data}
                                            chartFunction={generateSatisfactionRadialChartData}
                                            chartDataFunction={generateSatisfactionData}
                                            chartAsymetriqueFuntion={asymetriqueSatisfaction}
                                            title={
                                                <>
                                                    Ma QVT selon mes besoins de{" "}
                                                    <span className="text-fuchsia-600">Plaisir</span>
                                                </>
                                            }
                                            bgcolor1={"bg-satisfaction1"}
                                            bgcolor2={"bg-satisfaction2"}
                                            noDisplayTitle
                                        />
                                        <RadarChartComponent
                                            formData={selectedObjects[1].form_data}
                                            chartFunction={generateSatisfactionRadialChartData}
                                            chartDataFunction={generateSatisfactionData}
                                            chartAsymetriqueFuntion={asymetriqueSatisfaction}
                                            title={
                                                <>
                                                    Ma QVT selon mes besoins de{" "}
                                                    <span className="text-fuchsia-600">Plaisir</span>
                                                </>
                                            }
                                            bgcolor1={"bg-satisfaction1"}
                                            bgcolor2={"bg-satisfaction2"}
                                            noDisplayTitle
                                        />
                                    </div>
                                    <div className="w-full min-h-max flex justify-center">
                                        <RadarChartComponent
                                            formData={selectedObjects[0].form_data}
                                            chartFunction={generateInclusionRadialChartData}
                                            chartDataFunction={generateInclusionData}
                                            chartAsymetriqueFuntion={asymetriqueInclusion}
                                            title={
                                                <>
                                                    Ma QVT selon mes besoins d&apos;
                                                    <span className="text-inclusion1">Inclusion</span>
                                                </>
                                            }
                                            bgcolor1={"bg-inclusion1"}
                                            bgcolor2={"bg-inclusion2"}
                                            noDisplayTitle
                                        />
                                        <RadarChartComponent
                                            formData={selectedObjects[1].form_data}
                                            chartFunction={generateInclusionRadialChartData}
                                            chartDataFunction={generateInclusionData}
                                            chartAsymetriqueFuntion={asymetriqueInclusion}
                                            title={
                                                <>
                                                    Ma QVT selon mes besoins d&apos;
                                                    <span className="text-inclusion1">Inclusion</span>
                                                </>
                                            }
                                            bgcolor1={"bg-inclusion1"}
                                            bgcolor2={"bg-inclusion2"}
                                            noDisplayTitle
                                        />
                                    </div>
                                    <div className="w-full min-h-max flex justify-center">
                                        <RadarChartComponent
                                            formData={selectedObjects[0].form_data}
                                            chartFunction={generatePouvoiragirRadialChartData}
                                            chartDataFunction={generatePouvoiragirData}
                                            chartAsymetriqueFuntion={asymetriquePouvoiragir}
                                            title={
                                                <>
                                                    Ma QVT selon mes besoins de{" "}
                                                    <span className="text-sky-700">Pouvoir d&apos;agir</span>
                                                </>
                                            }
                                            bgcolor1={"bg-pouvoiragir1"}
                                            bgcolor2={"bg-pouvoiragir2"}
                                            noDisplayTitle
                                        />
                                        <RadarChartComponent
                                            formData={selectedObjects[1].form_data}
                                            chartFunction={generatePouvoiragirRadialChartData}
                                            chartDataFunction={generatePouvoiragirData}
                                            chartAsymetriqueFuntion={asymetriquePouvoiragir}
                                            title={
                                                <>
                                                    Ma QVT selon mes besoins de{" "}
                                                    <span className="text-sky-700">Pouvoir d&apos;agir</span>
                                                </>
                                            }
                                            bgcolor1={"bg-pouvoiragir1"}
                                            bgcolor2={"bg-pouvoiragir2"}
                                            noDisplayTitle
                                        />
                                    </div>
                                    <div className="w-full min-h-max flex justify-center">
                                        <RadarChartComponent
                                            formData={selectedObjects[0].form_data}
                                            chartFunction={generateSensRadialChartData}
                                            chartDataFunction={generateSensData}
                                            chartAsymetriqueFuntion={asymetriqueSens}
                                            title={
                                                <>
                                                    Ma QVT selon mes besoins de{" "}
                                                    <span className="text-sens1">Sens</span>
                                                </>
                                            }
                                            bgcolor1={"bg-sens1"}
                                            bgcolor2={"bg-sens2"}
                                            noDisplayTitle
                                        />
                                        <RadarChartComponent
                                            formData={selectedObjects[1].form_data}
                                            chartFunction={generateSensRadialChartData}
                                            chartDataFunction={generateSensData}
                                            chartAsymetriqueFuntion={asymetriqueSens}
                                            title={
                                                <>
                                                    Ma QVT selon mes besoins de{" "}
                                                    <span className="text-sens1">Sens</span>
                                                </>
                                            }
                                            bgcolor1={"bg-sens1"}
                                            bgcolor2={"bg-sens2"}
                                            noDisplayTitle
                                        />
                                    </div>
                                </div>
                            }
                        </main>
                        :
                        <div className={styles.main}>Page innaccessible à votre statut</div>
                }
            </Layout>
        </>
    );
};

export default ObjectList;

export async function getServerSideProps(context) {
    const token = cookies(context).token;
    const email = verifyJwt(token) != null ? verifyJwt(token).email : "nomail";
    let { id_m } = context.query
    let userResponse;
    if (id_m) {
        userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/id/${id_m}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });
    } else {
        userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/email/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });
    }

    let userResponseJson = { data: {} };

    if (userResponse.ok) {
        userResponseJson = await userResponse.json();
    }

    const thisUserResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/email/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: token,
        },
    });

    let thisUserResponseJson = { data: {} };

    if (thisUserResponse.ok) {
        thisUserResponseJson = await thisUserResponse.json();
    }
    const allDiagnostics = await getAllDiagnostics();

    const toSend = allDiagnostics.filter((value, index) => value.email == userResponseJson.data.email)

    return {
        props: { thisUser: userResponseJson.data, user: thisUserResponseJson.data, diagnostics: JSON.stringify(toSend) }, // will be passed to the page component as props
    };
}