<template>
	<div>
		<!-- {{ loggedUser }}
    <br />
    <pre> {{ datos }} </pre> -->

		<div class="container-fluid">

			<div class="row">
				<div class="col-xl-6">
					<Card :title=datos.nombre_completo :imageSrc=currentUser.img :text=datos.cargo footer="jaja" />

					{{ datos }}
					<!-- <div class="card overflow-hidden m-1">
            <div class="bg-soft bg-primary">
              <div class="row">
                <div class="col-7">
                  <div class="text-primary p-3">
                    <h5 class="text-primary">Welcome Back !</h5>
                    <p>Skote Dashboard</p>
                  </div>
                </div>
                <div class="col-5 align-self-end">
                  <img
                    src="/img/profile-img.f9b6a076.png"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="row">
                <div class="col-sm-4">
                  <div class="avatar-md profile-user-wid mb-4">
                    <img
                      src="/img/avatar-1.eaa06c3b.jpg"
                      alt=""
                      class="img-thumbnail rounded-circle"
                    />
                  </div>
                  <h5 class="font-size-15 text-truncate">Henry Price</h5>
                  <p class="text-muted mb-0 text-truncate">UI/UX Designer</p>
                </div>
                <div class="col-sm-8">
                  <div class="pt-4">
                    <div class="row">
                      <div class="col-6">
                        <h5 class="font-size-15">125</h5>
                        <p class="text-muted mb-0">Projects</p>
                      </div>
                      <div class="col-6">
                        <h5 class="font-size-15">$1245</h5>
                        <p class="text-muted mb-0">Revenue</p>
                      </div>
                    </div>
                    <div class="mt-4">
                      <a href="" class="btn btn-primary btn-sm">
                        View Profile <i class="mdi mdi-arrow-right ms-1"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
					<div class="card m-1">
						<div class="card-body">
							<h4 class="card-title mb-4">Monthly Earning</h4>
							<div class="row">
								<div class="col-sm-6">
									<p class="text-muted">This month</p>
									<h3>$34,252</h3>
									<p class="text-muted">
										<span class="text-success me-2">
											12% <i class="mdi mdi-arrow-up"></i></span>
										From previous period
									</p>
									<div class="mt-4">
										<a href="javascript: void(0);" class="btn btn-primary btn-sm">
											View More <i class="mdi mdi-arrow-right ms-1"></i></a>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="vue-apexcharts apex-charts" dir="ltr" style="min-height: 168.525px;">
										<div id="apexcharts3b5g6p6w"
											class="apexcharts-canvas apexcharts3b5g6p6w apexcharts-theme-light"
											style="width: 137px; height: 168.525px;">
											<svg id="SvgjsSvg1006" width="137" height="168.52499999999998"
												xmlns="http://www.w3.org/2000/svg" version="1.1"
												xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev"
												class="apexcharts-svg" xmlns:data="ApexChartsNS"
												transform="translate(0, -10)" style="background: transparent;">
												<g id="SvgjsG1008" class="apexcharts-inner apexcharts-graphical"
													transform="translate(-18.5, 0)">
													<defs id="SvgjsDefs1007">
														<clipPath id="gridRectMask3b5g6p6w">
															<rect id="SvgjsRect1010" width="182" height="200" x="-3" y="-1"
																rx="0" ry="0" opacity="1" stroke-width="0" stroke="none"
																stroke-dasharray="0" fill="#fff"></rect>
														</clipPath>
														<clipPath id="forecastMask3b5g6p6w"></clipPath>
														<clipPath id="nonForecastMask3b5g6p6w"></clipPath>
														<clipPath id="gridRectMarkerMask3b5g6p6w">
															<rect id="SvgjsRect1011" width="180" height="202" x="-2" y="-2"
																rx="0" ry="0" opacity="1" stroke-width="0" stroke="none"
																stroke-dasharray="0" fill="#fff"></rect>
														</clipPath>
														<linearGradient id="SvgjsLinearGradient1016" x1="1" y1="0" x2="0"
															y2="1">
															<stop id="SvgjsStop1017" stop-opacity="1"
																stop-color="rgba(242,242,242,1)" offset="0"></stop>
															<stop id="SvgjsStop1018" stop-opacity="1"
																stop-color="rgba(206,206,206,1)" offset="0.5"></stop>
															<stop id="SvgjsStop1019" stop-opacity="1"
																stop-color="rgba(206,206,206,1)" offset="0.65"></stop>
															<stop id="SvgjsStop1020" stop-opacity="1"
																stop-color="rgba(242,242,242,1)" offset="0.91"></stop>
														</linearGradient>
														<linearGradient id="SvgjsLinearGradient1028" x1="1" y1="0" x2="0"
															y2="1">
															<stop id="SvgjsStop1029" stop-opacity="1"
																stop-color="rgba(85,110,230,1)" offset="0"></stop>
															<stop id="SvgjsStop1030" stop-opacity="1"
																stop-color="rgba(72,94,196,1)" offset="0.5"></stop>
															<stop id="SvgjsStop1031" stop-opacity="1"
																stop-color="rgba(72,94,196,1)" offset="0.65"></stop>
															<stop id="SvgjsStop1032" stop-opacity="1"
																stop-color="rgba(85,110,230,1)" offset="0.91"></stop>
														</linearGradient>
													</defs>
													<g id="SvgjsG1012" class="apexcharts-radialbar">
														<g id="SvgjsG1013">
															<g id="SvgjsG1014" class="apexcharts-tracks">
																<g id="SvgjsG1015"
																	class="apexcharts-radialbar-track apexcharts-track"
																	rel="1">
																	<path id="apexcharts-radialbarTrack-0"
																		d="M 50.94156838842453 125.05843161157546 A 52.40853658536585 52.40853658536585 0 1 1 125.05843161157546 125.05843161157546"
																		fill="none" fill-opacity="1"
																		stroke="rgba(242,242,242,0.85)" stroke-opacity="1"
																		stroke-linecap="butt"
																		stroke-width="14.514512195121952"
																		stroke-dasharray="0"
																		class="apexcharts-radialbar-area"
																		data:pathOrig="M 50.94156838842453 125.05843161157546 A 52.40853658536585 52.40853658536585 0 1 1 125.05843161157546 125.05843161157546">
																	</path>
																</g>
															</g>
															<g id="SvgjsG1022">
																<g id="SvgjsG1027"
																	class="apexcharts-series apexcharts-radial-series"
																	seriesName="SeriesxA" rel="1" data:realIndex="0">
																	<path id="SvgjsPath1033"
																		d="M 50.94156838842453 125.05843161157546 A 52.40853658536585 52.40853658536585 0 1 1 125.69954624335796 51.59397137746902"
																		fill="none" fill-opacity="0.85"
																		stroke="url(#SvgjsLinearGradient1028)"
																		stroke-opacity="1" stroke-linecap="butt"
																		stroke-width="14.963414634146343"
																		stroke-dasharray="4"
																		class="apexcharts-radialbar-area apexcharts-radialbar-slice-0"
																		data:angle="181" data:value="67" index="0" j="0"
																		data:pathOrig="M 50.94156838842453 125.05843161157546 A 52.40853658536585 52.40853658536585 0 1 1 125.69954624335796 51.59397137746902">
																	</path>
																</g>
																<circle id="SvgjsCircle1023" r="40.151280487804875" cx="88"
																	cy="88" class="apexcharts-radialbar-hollow"
																	fill="transparent"></circle>
																<g id="SvgjsG1024" class="apexcharts-datalabels-group"
																	transform="translate(0, 0) scale(1)"
																	style="opacity: 1;">
																	<text id="SvgjsText1025"
																		font-family="Helvetica, Arial, sans-serif" x="88"
																		y="148" text-anchor="middle"
																		dominant-baseline="auto" font-size="13px"
																		font-weight="600" fill="#556ee6"
																		class="apexcharts-text apexcharts-datalabel-label"
																		style="font-family: Helvetica, Arial, sans-serif;">
																		Series A
																	</text>
																	<text id="SvgjsText1026"
																		font-family="Helvetica, Arial, sans-serif" x="88"
																		y="126" text-anchor="middle"
																		dominant-baseline="auto" font-size="16px"
																		font-weight="400" fill="#373d3f"
																		class="apexcharts-text apexcharts-datalabel-value"
																		style="font-family: Helvetica, Arial, sans-serif;">
																		67%
																	</text>
																</g>
															</g>
														</g>
													</g>
													<line id="SvgjsLine1034" x1="0" y1="0" x2="176" y2="0" stroke="#b6b6b6"
														stroke-dasharray="0" stroke-width="1" stroke-linecap="butt"
														class="apexcharts-ycrosshairs"></line>
													<line id="SvgjsLine1035" x1="0" y1="0" x2="176" y2="0"
														stroke-dasharray="0" stroke-width="0" stroke-linecap="butt"
														class="apexcharts-ycrosshairs-hidden"></line>
												</g>
												<g id="SvgjsG1009" class="apexcharts-annotations"></g>
											</svg>
											<div class="apexcharts-legend"></div>
										</div>
									</div>
								</div>
							</div>
							<p class="text-muted mb-0">
								We craft digital, graphic and dimensional thinking.
							</p>
						</div>
					</div>
				</div>
				<div class="col-xl-6">
					<div class="row">
						<div class="col-md-4">
							<div class="card mini-stats-wid">
								<div class="card-body">
									<div class="d-flex">
										<div class="flex-grow-1">
											<p class="text-muted fw-medium mb-2">Orders</p>
											<h4 class="mb-0">1,235</h4>
										</div>
										<div class="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
											<span class="avatar-title"><i class="bx bx-copy-alt font-size-24"></i></span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="card mini-stats-wid">
								<div class="card-body">
									<div class="d-flex">
										<div class="flex-grow-1">
											<p class="text-muted fw-medium mb-2">Revenue</p>
											<h4 class="mb-0">$35, 723</h4>
										</div>
										<div class="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
											<span class="avatar-title"><i class="bx bx-archive-in font-size-24"></i></span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="card mini-stats-wid">
								<div class="card-body">
									<div class="d-flex">
										<div class="flex-grow-1">
											<p class="text-muted fw-medium mb-2">Average Price</p>
											<h4 class="mb-0">$16.2</h4>
										</div>
										<div class="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
											<span class="avatar-title"><i
													class="bx bx-purchase-tag-alt font-size-24"></i></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="card">

					</div>
				</div>
			</div>
			<div class="row ">
				<div class="col-xl-4">
					<div class="card m-1">
						<div class="card-body">
							<h4 class="card-title mb-4">Social Source</h4>
							<div class="text-center">
								<div class="avatar-sm mx-auto mb-4">
									<span class="avatar-title rounded-circle bg-primary bg-soft font-size-24"><i
											class="mdi mdi-facebook text-primary"></i></span>
								</div>
								<p class="font-16 text-muted mb-2"></p>
								<h5>
									<a href="javascript: void(0);" class="text-dark">
										Facebook -
										<span class="text-muted font-16">125 sales</span></a>
								</h5>
								<p class="text-muted">
									Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien
									ut libero venenatis faucibus tincidunt.
								</p>
								<a href="javascript: void(0);" class="text-primary font-16">
									Learn more <i class="mdi mdi-chevron-right"></i></a>
							</div>
							<div class="row mt-4">
								<div class="col-sm-4">
									<div class="social-source text-center mt-3">
										<div class="avatar-xs mx-auto mb-3">
											<span class="avatar-title rounded-circle bg-primary font-size-16"><i
													class="mdi mdi-facebook text-white"></i></span>
										</div>
										<h5 class="font-size-15">Facebook</h5>
										<p class="text-muted mb-0">125 sales</p>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="social-source text-center mt-3">
										<div class="avatar-xs mx-auto mb-3">
											<span class="avatar-title rounded-circle bg-info font-size-16"><i
													class="mdi mdi-twitter text-white"></i></span>
										</div>
										<h5 class="font-size-15">Twitter</h5>
										<p class="text-muted mb-0">112 sales</p>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="social-source text-center mt-3">
										<div class="avatar-xs mx-auto mb-3">
											<span class="avatar-title rounded-circle bg-pink font-size-16"><i
													class="mdi mdi-instagram text-white"></i></span>
										</div>
										<h5 class="font-size-15">Instagram</h5>
										<p class="text-muted mb-0">104 sales</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xl-4">
					<div class="card m-1">
						<div class="card-body">
							<h4 class="card-title mb-5">Activity</h4>
							<ul class="verti-timeline list-unstyled">
								<li class="event-list">
									<div class="event-timeline-dot">
										<i class="bx bx-right-arrow-circle font-size-18"></i>
									</div>
									<div class="d-flex">
										<div class="me-3">
											<h5 class="font-size-14">
												22 Nov
												<i
													class="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i>
											</h5>
										</div>
										<div class="flex-grow-1">
											<div>Responded to need “Volunteer Activities</div>
										</div>
									</div>
								</li>
								<li class="event-list">
									<div class="event-timeline-dot">
										<i class="bx bx-right-arrow-circle font-size-18"></i>
									</div>
									<div class="d-flex">
										<div class="me-3">
											<h5 class="font-size-14">
												17 Nov
												<i
													class="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i>
											</h5>
										</div>
										<div class="flex-grow-1">
											<div>
												Everyone realizes why a new common language would be
												desirable...
												<a href="javascript: void(0);">Read more</a>
											</div>
										</div>
									</div>
								</li>
								<li class="event-list active">
									<div class="event-timeline-dot">
										<i class="bx bxs-right-arrow-circle font-size-18 bx-fade-right"></i>
									</div>
									<div class="d-flex">
										<div class="me-3">
											<h5 class="font-size-14">
												15 Nov
												<i
													class="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i>
											</h5>
										</div>
										<div class="flex-grow-1">
											<div>Joined the group “Boardsmanship Forum”</div>
										</div>
									</div>
								</li>
								<li class="event-list">
									<div class="event-timeline-dot">
										<i class="bx bx-right-arrow-circle font-size-18"></i>
									</div>
									<div class="d-flex">
										<div class="me-3">
											<h5 class="font-size-14">
												12 Nov
												<i
													class="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i>
											</h5>
										</div>
										<div class="flex-grow-1">
											<div>Responded to need “In-Kind Opportunity”</div>
										</div>
									</div>
								</li>
							</ul>
							<div class="text-center mt-4">
								<a href="javascript: void(0);" class="btn btn-primary btn-sm">View More <i
										class="mdi mdi-arrow-right ms-1"></i></a>
							</div>
						</div>
					</div>
				</div>
				<div class="col-xl-4">
					<div class="card">
						<div class="card-body">
							<h4 class="card-title mb-4">Top Cities Selling Product</h4>
							<div class="text-center">
								<div class="mb-4">
									<i class="bx bx-map-pin text-primary display-4"></i>
								</div>
								<h3>1,456</h3>
								<p>San Francisco</p>
							</div>
							<div class="table-responsive mt-4">
								<table class="table table-centered">
									<tbody>
										<tr>
											<td style="width: 140px;">
												<p class="mb-0">San Francisco</p>
											</td>
											<td style="width: 120px;">
												<h5 class="mb-0">1,456</h5>
											</td>
											<td>
												<div class="progress" style="height: 5px;">
													<div class="progress-bar bg-primary" role="progressbar"
														aria-valuenow="94" aria-valuemin="0" style="width: 94%;"></div>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<p class="mb-0">Los Angeles</p>
											</td>
											<td>
												<h5 class="mb-0">1,123</h5>
											</td>
											<td>
												<div class="progress" style="height: 5px;">
													<div class="progress-bar bg-success" role="progressbar"
														aria-valuenow="82" aria-valuemin="0" style="width: 82%;"></div>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<p class="mb-0">San Diego</p>
											</td>
											<td>
												<h5 class="mb-0">1,026</h5>
											</td>
											<td>
												<div class="progress" style="height: 5px;">
													<div class="progress-bar bg-warning" role="progressbar"
														aria-valuenow="70" aria-valuemin="0" style="width: 70%;"></div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<div class="card">
						<div class="card-body">
							<h4 class="card-title mb-4">Latest Transaction</h4>
							<div class="table-responsive mb-0">
								<table class="table align-middle table-nowrap">
									<thead class="table-light">
										<tr>
											<th style="width: 20px;">
												<div class="form-check font-size-16 align-middle">
													<input class="form-check-input" type="checkbox"
														id="transactionCheck01" /><label class="form-check-label"
														for="transactionCheck01"></label>
												</div>
											</th>
											<th class="align-middle">Order ID</th>
											<th class="align-middle">Billing Name</th>
											<th class="align-middle">Date</th>
											<th class="align-middle">Total</th>
											<th class="align-middle">Payment Status</th>
											<th class="align-middle">Payment Method</th>
											<th class="align-middle">View Details</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<div class="form-check font-size-16">
													<input class="form-check-input" type="checkbox"
														id="transactionCheck1" /><label class="form-check-label"
														for="transactionCheck1"></label>
												</div>
											</td>
											<td>
												<a href="javascript: void(0);" class="text-body fw-bold">#SK2540</a>
											</td>
											<td>Neal Matthews</td>
											<td>07 Oct, 2019</td>
											<td>$400</td>
											<td>
												<span class="badge badge-pill badge-soft-success font-size-11">Paid</span>
											</td>
											<td>
												<i class="fab fa-cc-mastercard me-1"></i> Mastercard
											</td>
											<td>
												<button type="button" class="btn btn-primary btn-sm btn-rounded">
													View Details
												</button>
											</td>
										</tr>
										<tr>
											<td>
												<div class="form-check font-size-16">
													<input class="form-check-input" type="checkbox"
														id="transactionCheck2" /><label class="form-check-label"
														for="transactionCheck2"></label>
												</div>
											</td>
											<td>
												<a href="javascript: void(0);" class="text-body fw-bold">#SK2541</a>
											</td>
											<td>Jamal Burnett</td>
											<td>07 Oct, 2019</td>
											<td>$380</td>
											<td>
												<span
													class="badge badge-pill badge-soft-success font-size-11 badge-soft-danger">Chargeback</span>
											</td>
											<td><i class="fab fa-cc-visa me-1"></i> Visa</td>
											<td>
												<button type="button" class="btn btn-primary btn-sm btn-rounded">
													View Details
												</button>
											</td>
										</tr>
										<tr>
											<td>
												<div class="form-check font-size-16">
													<input class="form-check-input" type="checkbox"
														id="transactionCheck3" /><label class="form-check-label"
														for="transactionCheck3"></label>
												</div>
											</td>
											<td>
												<a href="javascript: void(0);" class="text-body fw-bold">#SK2542</a>
											</td>
											<td>Juan Mitchell</td>
											<td>06 Oct, 2019</td>
											<td>$384</td>
											<td>
												<span class="badge badge-pill badge-soft-success font-size-11">Paid</span>
											</td>
											<td><i class="fab fab fa-cc-paypal me-1"></i> Paypal</td>
											<td>
												<button type="button" class="btn btn-primary btn-sm btn-rounded">
													View Details
												</button>
											</td>
										</tr>
										<tr>
											<td>
												<div class="form-check font-size-16">
													<input class="form-check-input" type="checkbox"
														id="transactionCheck4" /><label class="form-check-label"
														for="transactionCheck4"></label>
												</div>
											</td>
											<td>
												<a href="javascript: void(0);" class="text-body fw-bold">#SK2543</a>
											</td>
											<td>Barry Dick</td>
											<td>05 Oct, 2019</td>
											<td>$412</td>
											<td>
												<span class="badge badge-pill badge-soft-success font-size-11">Paid</span>
											</td>
											<td>
												<i class="fab fa-cc-mastercard me-1"></i> Mastercard
											</td>
											<td>
												<button type="button" class="btn btn-primary btn-sm btn-rounded">
													View Details
												</button>
											</td>
										</tr>
										<tr>
											<td>
												<div class="form-check font-size-16">
													<input class="form-check-input" type="checkbox"
														id="transactionCheck5" /><label class="form-check-label"
														for="transactionCheck5"></label>
												</div>
											</td>
											<td>
												<a href="javascript: void(0);" class="text-body fw-bold">#SK2544</a>
											</td>
											<td>Ronald Taylor</td>
											<td>04 Oct, 2019</td>
											<td>$404</td>
											<td>
												<span
													class="badge badge-pill badge-soft-success font-size-11 badge-soft-warning">Refund</span>
											</td>
											<td><i class="fab fa-cc-visa me-1"></i> Visa</td>
											<td>
												<button type="button" class="btn btn-primary btn-sm btn-rounded">
													View Details
												</button>
											</td>
										</tr>
										<tr>
											<td>
												<div class="form-check font-size-16">
													<input class="form-check-input" type="checkbox"
														id="transactionCheck6" /><label class="form-check-label"
														for="transactionCheck6"></label>
												</div>
											</td>
											<td>
												<a href="javascript: void(0);" class="text-body fw-bold">#SK2545</a>
											</td>
											<td>Jacob Hunter</td>
											<td>04 Oct, 2019</td>
											<td>$392</td>
											<td>
												<span class="badge badge-pill badge-soft-success font-size-11">Paid</span>
											</td>
											<td><i class="fab fab fa-cc-paypal me-1"></i> Paypal</td>
											<td>
												<button type="button" class="btn btn-primary btn-sm btn-rounded">
													View Details
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import perfilServices from "../../../../../services/profiles/perfil/perfilServices";
import { mapGetters } from "vuex";
import Card from '../../../../../components/UI/Card/Card.vue';
export default {
	components: {
		Card
	},
	name: "GeneralPerfil",
	data() {
		return {
			users: [],
			otraVariable: null,
			datos: []
		};
	},
	computed: {
		...mapGetters({
			currentUser: "currentUser"
		}),
		loggedUser: function () {
			return this.$store.state.user.currentUser["id"]; // Accede al valor de $loggedUserId desde el store de Vuex
		}
	},
	methods: {
		async getPrueba() {
			try {
				this.otraVariable = this.loggedUser; // Asigna el valor a otraVariable
				const response = await perfilServices.prueba();
				// this.users = response.data.data;
			} catch (error) {
			} finally {
			}
		},
		async getInfo() {
			const params = {
				id: this.loggedUser // Suponiendo que userId sea el nombre del parámetro en la solicitud
			};

			try {
				const response = await perfilServices.show(params);
				this.datos = response.data.data;
			} catch (error) {
				// Manejar errores aquí
				console.error("Error:", error);
			}
		}
	},
	async mounted() {
		await this.getPrueba();
		await this.getInfo();
	}
};
</script>
