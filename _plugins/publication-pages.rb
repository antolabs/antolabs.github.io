require 'json'

module PublicationDiscovery
  def publication_url(path)
    site = @context.registers[:site]
    "#{site.config['url'].to_s.chomp('/')}#{site.config['baseurl']}#{path}"
  end

  def publication_schema(paper)
    url = publication_url("/publications/#{paper['id']}/")
    journal = { '@type' => 'Periodical', 'name' => paper['journal'] }
    journal = { '@type' => 'PublicationVolume', 'volumeNumber' => paper['volume'], 'isPartOf' => journal } if paper['volume']
    journal = { '@type' => 'PublicationIssue', 'issueNumber' => paper['issue'], 'isPartOf' => journal } if paper['issue']
    {
      '@context' => 'https://schema.org', '@type' => 'ScholarlyArticle', '@id' => "#{url}#article",
      'url' => url, 'mainEntityOfPage' => url, 'headline' => paper['title'], 'name' => paper['title'],
      'author' => paper['authors'].map do |name|
        person = { '@type' => 'Person', 'name' => name }
        person['@id'] = publication_url('/#person') if name == 'Geunhyeong Lee'
        person
      end,
      'datePublished' => paper['year'], 'isPartOf' => journal,
      'pageStart' => paper['first_page'], 'pageEnd' => paper['last_page'],
      'identifier' => { '@type' => 'PropertyValue', 'propertyID' => 'DOI', 'value' => paper['doi'] },
      'sameAs' => "https://doi.org/#{paper['doi']}", 'abstract' => paper['abstract'],
      'keywords' => paper['keywords'], 'inLanguage' => 'en',
      'encoding' => { '@type' => 'MediaObject', 'contentUrl' => publication_url(paper['pdf']), 'encodingFormat' => 'application/pdf' }
    }.compact
  end

  def publication_collection(papers)
    {
      '@context' => 'https://schema.org', '@type' => 'CollectionPage',
      '@id' => publication_url('/publications/#collection'), 'url' => publication_url('/publications/'),
      'name' => 'Publications (SCIE) | Geunhyeong Lee', 'about' => { '@id' => publication_url('/#person') },
      'mainEntity' => {
        '@type' => 'ItemList', 'numberOfItems' => papers.size,
        'itemListElement' => papers.each_with_index.map do |paper, index|
          { '@type' => 'ListItem', 'position' => index + 1, 'name' => paper['title'], 'url' => publication_url("/publications/#{paper['id']}/") }
        end
      }
    }
  end

  def publication_citations(papers)
    papers.to_h { |paper| [paper['id'], paper['citation']] }
  end

  # Keep JSON valid inside HTML scripts, including future titles with markup characters.
  def discovery_json(value)
    JSON.generate(value).gsub('<', '\\u003c').gsub('>', '\\u003e').gsub('&', '\\u0026')
  end
end

Liquid::Template.register_filter(PublicationDiscovery)

module Jekyll
  class PublicationPages < Generator
    safe true
    priority :low

    def generate(site)
      papers = site.data.fetch('publications')
      ids = papers.map { |paper| paper.fetch('id') }
      unless ids.uniq.size == ids.size && ids.all? { |id| id.match?(/\A[a-z0-9-]+\z/) }
        raise Errors::FatalException, 'Publication IDs must be unique URL-safe identifiers'
      end
      papers.each do |paper|
        directory = "publications/#{paper['id']}"
        page = PageWithoutAFile.new(site, site.source, directory, 'index.html')
        page.data.merge!(
          'layout' => 'publication', 'title' => paper['title'], 'publication' => paper,
          'description' => paper['abstract'].split(/(?<=\.)\s+/).first,
          'keywords' => paper['keywords'].join(', '),
          'body_class' => 'publication-detail-view', 'footer_static' => true,
          'permalink' => "/#{directory}/", 'sitemap' => true
        )
        site.pages << page
        { 'bib' => 'bibtex', 'ris' => 'ris' }.each do |extension, format|
          # A .txt source avoids jekyll-scholar converting BibTeX downloads to HTML.
          citation = PageWithoutAFile.new(site, site.source, directory, "citation-#{extension}.txt")
          citation.content = "#{paper['citation'].fetch(format)}\n"
          citation.data.merge!('layout' => nil, 'sitemap' => false, 'permalink' => "/#{directory}/citation.#{extension}")
          site.pages << citation
        end
      end
    end
  end
end
