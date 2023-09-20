<template>
	<span class=" text-center d-flex justify-content-between">
		<span>
			<h1 v-if="heading && heading.length > 0">{{ heading }}</h1>
		</span>
		<b-nav>
			<b-breadcrumb :items="items" />
		</b-nav>
	</span>
</template>

<script>
import { adminRoot } from "../../constants/config";
export default {
	props: ["heading"],
	data() {
		return {
			items: []
		};
	},
	methods: {
		getUrl(path, sub, index) {
			// return "/" + path.split(sub)[0] + sub;
			return "/" ;
		}
	},
	mounted() {
		let path = this.$route.path.substr(1);
		let rawPaths = path.split("/");

		for (var pName in this.$route.params) {
			if (rawPaths.includes(this.$route.params[pName])) {
				rawPaths = rawPaths.filter(x => x !== this.$route.params[pName]);
			}
		}
		rawPaths.map((sub, index) => {
			this.items.push({
				text:
					"/" + sub !== adminRoot
						? this.$t("titles." + sub)
						: this.$t("titles.home"),
				// : this.$t("group." + sub),
				// to: this.getUrl(path, sub, index)
				to: this.getUrl(path, sub, index)
			});
		});
	}
};
</script>
